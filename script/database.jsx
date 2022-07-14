/*
import mongoose from 'mongoose'


mongoose.connect(process.env.MONGO_URI)


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  replitId: { type: String, required: true },
  createdAt: { type: Date, required: true }
})

const User = mongoose.model("User", UserSchema)
*/


import mongoose, { Schema, model } from 'mongoose'

mongoose.connect(process.env.MONGO_URI);

const User = model('User', Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: Number, required: true },
  loggedWith: { type: String, required: true, default: 'replit' },
  image: { type: String, required: false, default: 'default image path' },
  level: { type: Number, required: true, default: 0 },
  bio: { type: String, required: true, default: 'Hello world!' },
  followers: { type: String, required: true, default: '' }// ids separated 
}));

const Game = model('Game', Schema({
  userOne: { type: String, required: true },// id
  userTwo: { type: String, required: true },// id
  winner: { type: String, required: true },// ?
  moves: { type: Number, required: true, default: 1000 },// number
  time: { type: Number, required: true }// minutes
}));

export default {
  User,
  Game
}