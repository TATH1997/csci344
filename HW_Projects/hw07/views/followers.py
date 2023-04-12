import select
from flask import Response, request
from flask_restful import Resource
from models import Following
import json

def get_path():
    return request.host_url + 'api/posts/'

class FollowerListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    
    # def get_list_of_user_ids_in_my_network(user_id):
    #     following = Following.query.filter_by(user_id=user_id).all()
    #     me_and_my_friend_ids = [rec.following_id for rec in following]
    #     me_and_my_friend_ids.append(user_id)
    #     return me_and_my_friend_ids

    def get(self):
        '''
        People who are following the current user.
        In other words, select user_id where following_id = current_user.id
        '''
        following = Following.query.filter_by(following_id=self.current_user.id).all()
        me_and_my_friend_ids = [rec.to_dict_follower() for rec in following]
        return Response(json.dumps(me_and_my_friend_ids), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        FollowerListEndpoint, 
        '/api/followers', 
        '/api/followers/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    
