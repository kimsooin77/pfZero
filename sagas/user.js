import axios from 'axios';
import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import { 
    LOG_IN_SUCCESS, LOG_OUT_SUCCESS, SIGN_UP_SUCCESS,
    LOG_IN_REQUEST, LOG_OUT_REQUEST, SIGN_UP_REQUEST,
    LOG_IN_FAILURE, LOG_OUT_FAILURE, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE, 
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, 
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE
} from '../reducers/user';



function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type : REMOVE_FOLLOWER_SUCCESS,
            data : result.data,
        })
    }catch(err) {
        yield put({
            type : REMOVE_FOLLOWER_FAILURE,
            error : err.response.data,
        })
    }
}

function loadFollowersAPI(data) {
    return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type : LOAD_FOLLOWERS_SUCCESS,
            data : result.data,
        })
    }catch(err) {
        yield put({
            type : LOAD_FOLLOWERS_FAILURE,
            error : err.response.data,
        })
    }
}

function loadFollowingsAPI(data) {
    return axios.get('/user/followings', data)
}

function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type : LOAD_FOLLOWINGS_SUCCESS,
            data : result.data
        })
    }catch(err) {
        yield put({
            type : LOAD_FOLLOWINGS_FAILURE,
            error : err.response.data,
        })
    }
}

function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', {nickname : data})
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type : CHANGE_NICKNAME_SUCCESS,
            data : result.data
        })
    }catch(err) {
        yield put({
            type : CHANGE_NICKNAME_FAILURE,
            error : err.response.data,
        })
    }
}

function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data)
        yield put({
            type : LOAD_USER_SUCCESS,
            data : result.data,
        });
    } catch(err) {
        yield put({
            type : LOAD_USER_FAILURE,
            error : err.response.data, 
        });
    }
}

function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadMyInfo() {
    try {
        const result = yield call(loadMyInfoAPI);
        yield put({
            type : LOAD_MY_INFO_SUCCESS,
            data : result.data,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type : LOAD_MY_INFO_FAILURE,
            error : err.response.data, 
        });
    }
}

function logInAPI(data) {
    return axios.post('/user/login', data); // 로그인 요청 보냄
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data); // 로그인 요청에 대한 결과값을 받아서 변수에 저장
        
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data, // 로그인 성공시 결과값 안에 들어있는 data
        });
    } catch(err) {
        console.error(err);
        yield put({
            type : LOG_IN_FAILURE,
            error : err.response.data, // 로그인 실패시 결과값 안에 들어있는 data
        });
    }
}

function logOutAPI() {
    return axios.post('/user/logout')
}

function* logOut() {
    try{
        yield call(logOutAPI);
        yield put({
            type : LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type : LOG_OUT_FAILURE,
            error : err.response.data,
        })
    }
}

function signUpAPI(data) {
    return axios.post('/user', data) // data는 email,password,nickname이 들어있는 객체이다.
}

function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type : SIGN_UP_SUCCESS,
        });
    } catch (err) {
        yield put({
            type : SIGN_UP_FAILURE,
            error : err.response.data,
        })
    }
}

function followAPI(data) {
    return axios.patch(`/user/${data}/follow`); 
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type : FOLLOW_SUCCESS,
            data : result.data,
        });
    } catch(err) {
        yield put({
            type : FOLLOW_FAILURE,
            error : err.response.data, 
        });
    }
}


function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`); // 로그인 요청 보냄
}

function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data);
        yield put({
            type : UNFOLLOW_SUCCESS,
            data : result.data,
        });
    } catch(err) {
        yield put({
            type : UNFOLLOW_FAILURE,
            error : err.response.data,
        });
    }
}


function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchChnageNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}


export default function* userSaga() {
    yield all([
        fork(watchChnageNickname),
        fork(watchLoadMyInfo),
        fork(watchLoadUser),
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}