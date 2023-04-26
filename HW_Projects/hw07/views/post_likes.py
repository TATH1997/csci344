from flask import Response, request
from flask_restful import Resource
from models import LikePost, Post, Following, db
import json

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        # create a new "like_post" based on the data posted in the body 
        body = request.get_json()
        postID=None
        #bad input handeling
        try:
            postID=int(body.get('post_id'))
        except:
            if type(body.get('post_id'))==int:
                return Response(json.dumps({'error': 'ID is only of type int'}), mimetype="application/json", status=404)
            else: return Response(json.dumps({'error': 'ID is only of type int'}), mimetype="application/json", status=400)

        post =Post.query.get(postID)
        if not post:
            return Response(json.dumps({'error': 'No such post'}), mimetype="application/json", status=404) 
        allLikes=LikePost.query.filter_by(user_id=self.current_user.id).all()
        postIDs=[]
        for thing in allLikes:
            postIDs.append(thing.post_id)
        if postID in postIDs:
            return Response(json.dumps({'error' : 'Duplicate like'}), status=400)


        #not allowed to access post
        folIDs=[]
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        for fol in following:
            folIDs.append(fol.following_id)
        folIDs.append(self.current_user.id)
        givenPost=Post.query.get(body.get('post_id'))
        if givenPost.user_id not in folIDs:
            return Response(json.dumps({'error' : 'Cannot comment on someones post unless you follow  them'}), status=404)

        like=LikePost(user_id=self.current_user.id, post_id=postID)
        db.session.add(like)
        db.session.commit()

        return Response(json.dumps(like.to_dict()), mimetype="application/json", status=201)

class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "like_post" where "id"=id
        if type(id)!=int:
            return Response(json.dumps({'error': 'ID is only of type int'}), mimetype="application/json", status=404)
        like = LikePost.query.get(id)
        if not like:
            return Response(json.dumps({'error': 'No such comment exists'}), mimetype="application/json", status=404)
        if like.user_id!=self.current_user.id:
            return Response(json.dumps({'error': 'You can only delete your comments'}), mimetype="application/json", status=404)
        LikePost.query.filter_by(id=id).delete()
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)



def initialize_routes(api):
    api.add_resource(
        PostLikesListEndpoint, 
        '/api/posts/likes', 
        '/api/posts/likes/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    api.add_resource(
        PostLikesDetailEndpoint, 
        '/api/posts/likes/<int:id>', 
        '/api/posts/likes/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
