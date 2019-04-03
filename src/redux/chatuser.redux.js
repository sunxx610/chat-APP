import axios from 'axios'

const USER_LIST = 'USER_LIST'
const RESTAURANT_LIST = 'RESTAURANT_LIST'

const initState = {
	userList:[],
  restaurantList:[]
}

export function chatuser(state=initState, action){
	switch(action.type){
		case USER_LIST:
			return {...state, userList:action.payload}
    case RESTAURANT_LIST:
      return {...state, restaurantList:action.payload}
		default:
			return state
	}
}

function userList(data){
	return { type:USER_LIST, payload:data}
}
function restaurantList(data){
  return { type:RESTAURANT_LIST, payload:data}
}

//find restaurant/appliance user list
export function getUserList(type){
	return dispatch => {
		axios.get('/user/list?type='+type)
			.then(res=>{
				//console.log('redux----------------custermoer',type,res.data);
				if (res.data.code==0) {
				  if(type=='customer')
					dispatch(userList(res.data.data))
          else{
            dispatch(restaurantList(res.data.data))
          }
				}
			})

	}
}






