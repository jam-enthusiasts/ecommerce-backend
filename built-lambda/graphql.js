!function(e,r){for(var n in r)e[n]=r[n]}(exports,function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=7)}([function(e,r){e.exports=require("apollo-server-lambda")},function(e,r){e.exports=require("mongoose")},function(e,r){e.exports=require("bcryptjs")},function(e,r){e.exports=require("jsonwebtoken")},function(e,r){e.exports=require("graphql-resolvers")},function(e,r){e.exports=require("graphql-iso-date")},function(e,r){e.exports=require("reflect-metadata")},function(e,r,n){"use strict";n.r(r);var t=n(0),o=(n(6),n(5)),i=n(2);const a=n(3);var s=n(4);var l={Query:{hello:()=>"Hello dere",users:Object(s.combineResolvers)(async(e,r,{models:n})=>(console.log(r),n.User.find({}))),user:Object(s.combineResolvers)(async(e,{email:r},{models:n})=>n.User.findOne({email:r}))},Mutation:{signUp:async(e,r,{models:n})=>{const{email:o,password:a,name:s}=r,l=Object(i.genSaltSync)(10),c=await Object(i.hashSync)(a,l);if(await n.User.findOne({email:o}).then())throw new t.UserInputError("Sign up failed!");return n.User.create({email:o,password:c,name:s})},signIn:async(e,r,{models:n,secret:o})=>{const{email:s}=r,l=await n.User.findOne({email:s}).then(async e=>{if(!e)throw new t.UserInputError("Login failed!");if(!await Object(i.compareSync)(r.password,e.password))throw new t.AuthenticationError("Invalid login/password!");return e}),c=await(async(e,r,n)=>{const{id:t,email:o}=e;return await a.sign({id:t,email:o},r,{algorithm:"HS256",expiresIn:n})})(l,o,"7d");return console.log(c),{email:l.email,token:c}}}};var c=[{Date:o.GraphQLDateTime},l],u=t.gql`
	extend type Query {
    hello: String
		user(email: String!): User
    users: [User]
    me: User
	}

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      password2: String!
      name: String!
    ): User!
    signIn(email: String!, password: String!): Token!
  }
  type Token {
    id: String!
    name: String!
    email: String!
    token: String!
  }
  type User {
    name: String!
    email: String!
    date: String
  }
`;var d=[t.gql`
  scalar Date
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`,u],p=n(1),m=n(3);delete p.connection.models.User;const f=new p.Schema({name:{type:String,required:!0},email:{type:String,required:!0},password:{type:String,required:!0}});var g={User:Object(p.model)("User",f)};const y=new t.ApolloServer({typeDefs:d,resolvers:c,context:async({event:e})=>{const r=await(async e=>{if(e)try{return await Object(m.verify)(e,"supersecret")}catch(e){throw new t.AuthenticationError("Your Session expired. Sign in again.")}return null})(e.headers.authorization);return{models:g,me:r,secret:"supersecret"}}});p.connect("mongodb://corey:zxc123@ds131932.mlab.com:31932/mycl-ecommerce",{useUnifiedTopology:!0,useNewUrlParser:!0}).then(()=>{console.log("mongodb connected")}).catch(e=>{console.log(e)}),exports.handler=y.createHandler({cors:{origin:"*",credentials:!0}})}]));