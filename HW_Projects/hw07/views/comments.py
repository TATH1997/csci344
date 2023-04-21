from flask import Response, request
from flask_restful import Resource
import json
from models import db, Comment, Post, Following

class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        # create a new "Comment" based on the data posted in the body 
        body = request.get_json()
        allPosts=Post.query.all()
        validIDs=[]
        for post in allPosts:
            validIDs.append(post.id)
        #handle bad ID's 
        if body.get('post_id') not in validIDs:
            if type(body.get('post_id'))== int:
                return Response(json.dumps({'error' : 'Enter a valid ID'}), status=404)    
            else: return Response(json.dumps({'error' : 'Enter a valid ID'}), status=400)

        if not body.get('text'):
            return Response(json.dumps({'error' : 'Enter comment text'}), status=400)

        folIDs=[]
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        for fol in following:
            folIDs.append(fol.following_id)
        folIDs.append(self.current_user.id)
        givenPost=Post.query.get(body.get('post_id'))
        if givenPost.user_id not in folIDs:
            return Response(json.dumps({'error' : 'Cannot comment on someones post unless you follow  them'}), status=404)

        comment=Comment(text=body.get('text'), user_id=self.current_user.id, post_id=body.get('post_id'))
        db.session.add(comment)
        db.session.commit()
        return Response(json.dumps(comment.to_dict()), mimetype="application/json", status=201)
        
class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
  
    def delete(self, id):
        # delete "Comment" record where "id"=id
        if type(id)!=int:
            return Response(json.dumps({'error': 'ID is only of type int'}), mimetype="application/json", status=404)
        comment = Comment.query.get(id)
        if not comment:
            return Response(json.dumps({'error': 'No such comment exists'}), mimetype="application/json", status=404)
        if comment.user_id!=self.current_user.id:
            return Response(json.dumps({'error': 'You can only delete your comments'}), mimetype="application/json", status=404)
        Comment.query.filter_by(id=id).delete()
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        CommentListEndpoint, 
        '/api/comments', 
        '/api/comments/',
        resource_class_kwargs={'current_user': api.app.current_user}

    )
    api.add_resource(
        CommentDetailEndpoint, 
        '/api/comments/<int:id>', 
        '/api/comments/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
