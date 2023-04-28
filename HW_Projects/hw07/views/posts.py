from flask import Response, request
from flask_restful import Resource
from models import Post, Following, db
from views import get_authorized_user_ids
import flask_jwt_extended
import json

def get_path():
    return request.host_url + 'api/posts/'

#@flask_jwt_extended.jwt_required()
def get_list_of_user_ids_in_my_network(user_id):
    following = Following.query.filter_by(user_id=user_id).all()
    me_and_my_friend_ids = [rec.following_id for rec in following]
    me_and_my_friend_ids.append(user_id)
    return me_and_my_friend_ids

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required()
    def get(self):
        try:
            num=request.args.get('limit') or 20
            num=int(num)
        except:
            return Response(
                json.dumps({'error': 'You gave me a string, requires an int'}), status=400
            )
        if (num>50):
            return Response(
                json.dumps({'error': 'Bad data. Limit > 50'}), status=400
            )
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        #building list of friends usernames
        me_and_my_friend_ids=[]
        for rec in following:
            me_and_my_friend_ids.append(rec.following_id)
        #print(friend_ids)
        me_and_my_friend_ids.append(self.current_user.id)

        posts = Post.query.filter(Post.user_id.in_(me_and_my_friend_ids)).limit(num)
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    def post(self):
        # create a new post based on the data posted in the body 
        body = request.get_json()
        if not body.get('image_url'):
            return Response(json.dumps({'error' : 'url required'}), status=400 )
        
        post=Post(image_url=body.get('image_url'), caption=body.get('caption'), alt_text=body.get('alt_text'), user_id=self.current_user.id)

        db.session.add(post)
        db.session.commit()
        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=201)
        
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        
    @flask_jwt_extended.jwt_required()
    def patch(self, id):
        # update post based on the data posted in the body 
        body = request.get_json()
        post = Post.query.get(id)
        if not post:
            return Response(json.dumps({'error' : 'post does not exist'}), mimetype="application/json", status=404)
        if post.user_id!=self.current_user.id:
            return Response(json.dumps({'error' : 'cannot modify other users posts'}), mimetype="application/json", status=404)
        if body.get('image_url'):
            post.image_url=body.get('image_url')
        if body.get('caption'):
            post.caption=body.get('caption')
        if body.get('alt_text'):
            post.alt_text=body.get('alt_text')
        # saves changed to db
        db.session.commit()
        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        allPosts=Post.query.all()
        validIDs=[]
        for post in allPosts:
            if post.user_id!=self.current_user.id:
                continue
            validIDs.append(post.id)
        if (id==None) or (id not in validIDs):
            return Response(json.dumps({'error' : 'Enter a valid ID'}), status=404)  
        # delete post where "id"=id
        Post.query.filter_by(id=id).delete()
        db.session.commit()
        #Post.delete.filter_by(id=id).all()
        return Response(json.dumps({}), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    def get(self, id):
        # get the post based on the id
        # yourself and friends
        friendIDs=get_list_of_user_ids_in_my_network(self.current_user.id)
        post = Post.query.get(id)
        error_message={
            'error': 'post {0} does not exist.'.format(id) 
        }
        if post is None or post.user_id not in friendIDs: 
            return Response(json.dumps(error_message), mimetype="application/json", status=404)
        
        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

def initialize_routes(api):
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )