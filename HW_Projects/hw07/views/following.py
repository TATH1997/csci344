from flask import Response, request
from flask_restful import Resource
from models import Following, User, db
import json

def get_path():
    return request.host_url + 'api/posts/'

class FollowingListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        # return all of the "following" records that the current user is following
        following = Following.query.filter_by(user_id=self.current_user.id).all()
        me_and_my_friend_ids = [rec.to_dict_following() for rec in following]
        return Response(json.dumps(me_and_my_friend_ids), mimetype="application/json", status=200)

    def post(self):
        # create a new "following" record based on the data posted in the body 
        body = request.get_json()
        #Handle bad input
        UID=None
        try:
            UID=int(body.get('user_id'))
        except:
            return Response(json.dumps({'error' : 'Enter a valid ID'}), status=400)
        if not UID:
            return Response(json.dumps({'error' : 'Enter a valid ID'}), status=400)


        # Checking for duplicates 
        followingList=Following.query.filter_by(user_id=self.current_user.id)
        alreadyFollowing=[]
        for item in followingList:
            alreadyFollowing.append(item.following_id)
        if UID in alreadyFollowing:
            return Response(json.dumps({'error' : 'Already following'}), status=400)
        
        user=User.query.get(UID)
        if not user:
            return Response(json.dumps({'error' : 'No such user exists'}), status=404)

        newPerson=Following(user_id=self.current_user.id, following_id=UID)
        db.session.add(newPerson)
        db.session.commit()
        return Response(json.dumps(newPerson.to_dict_following()), mimetype="application/json", status=201)

class FollowingDetailEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "following" record where "id"=id
        if type(id)!=int:
            return Response(json.dumps({'error': 'ID is only of type int'}), mimetype="application/json", status=404)
        follow = Following.query.get(id)
        if not follow:
            return Response(json.dumps({'error': 'No such comment exists'}), mimetype="application/json", status=404)
        if follow.user_id!=self.current_user.id:
            return Response(json.dumps({'error': 'You can only delete your comments'}), mimetype="application/json", status=404)
        Following.query.filter_by(id=id).delete()
        db.session.commit()
        return Response(json.dumps({}), mimetype="application/json", status=200)




def initialize_routes(api):
    api.add_resource(
        FollowingListEndpoint, 
        '/api/following', 
        '/api/following/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        FollowingDetailEndpoint, 
        '/api/following/<int:id>', 
        '/api/following/<int:id>/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
