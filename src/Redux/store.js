import { configureStore } from '@reduxjs/toolkit'
import MusicStage from './Features/MusicSlice/MusicSlice';
import UserData from './Features/SaveData/user';
export default configureStore({
  reducer: {
    Stage:MusicStage,
    user:UserData
  },
})