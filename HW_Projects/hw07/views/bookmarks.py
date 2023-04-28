from flask import Response, request
from flask_restful import Resource
from models import Bookmark, db, Post, Following
import json
import flask_jwt_extended

class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    @flask_jwt_extended.jwt_required()
    def get(self):
        # get all bookmarks owned by the current user
        marks = Bookmark.query.filter_by(user_id=self.current_user.id).all()
        bookmarks = [rec.to_dict() for rec in marks]
        return Response(json.dumps(bookmarks), mimetype="application/json", status=200)

    @flask_jwt_extended.jwt_required()
    #May have to add other decorators 
    def post(self):
        # create a new "bookmark" based on the data posted in the body 
        body = request.get_json()
        postID=None
        #Handle bad inputs
        try:
            postID=int(body.get('post_id'))
        except:
            return Response(json.dumps({'error' : 'ID must be of type int'}), status=400)
        post=Post.query.get(postID)
        if not post:
            return Response(json.dumps({'error' : 'No such post exists'}), status=404)
        #Check for dups
        bookmarks=Bookmark.query.filter_by(user_id=self.current_user.id, post_id=postID).all()
        if bookmarks:
            return Response(json.dumps({'error' : 'Post already bookmarked'}), status=400)
        
        folIDs=[]
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        for fol in following:
            folIDs.append(fol.following_id)
        folIDs.append(self.current_user.id)
        if post.user_id not in folIDs:
            return Response(json.dumps({'error' : 'Cannot bookmark a post unless you follow its publisher'}), status=404)

        #Make new bookmark
        mark=Bookmark(user_id=self.current_user.id, post_id=postID)
        db.session.add(mark)
        db.session.commit()

        return Response(json.dumps(mark.to_dict()), mimetype="application/json", status=201)

class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    @flask_jwt_extended.jwt_required()
    def delete(self, id):
        #Bad input handeling
        try:
            int(id)
        except:
            return Response(json.dumps({'error' : 'ID must be of type int'}), status=404)
        mark=Bookmark.query.get(id)
        #Test for DNE error
        if not mark:
            return Response(json.dumps({'error' : 'No such bookmark'}), status=404)
        #Check for ownership
        if mark.user_id!=self.current_user.id:
            return Response(json.dumps({'error' : 'Can only delete your own bookmarks'}), status=404)
        # delete "bookmark" record where "id"=id
        Bookmark.query.filter_by(id=id).delete()
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)



def initialize_routes(api):
    api.add_resource(
        BookmarksListEndpoint, 
        '/api/bookmarks', 
        '/api/bookmarks/', 
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )

    api.add_resource(
        BookmarkDetailEndpoint, 
        '/api/bookmarks/<int:id>', 
        '/api/bookmarks/<int:id>',
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )
