/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http:links.sailsjs.orgdocscontrollers
 */

module.exports = {

	login: function (req, res) {

		if(req.session.authenticated){
			return res.redirect('tasks');
		}
		else if(!req.param('username')|| !req.param('password')){
			res.badRequest({title:'Erro',message:'O email ou a senha estão em branco'},'login');
		}
		else{
			User.findOne({username:req.param('username'),password:req.param('password')})
			.exec(function findOneCB(err, User){
				if(err){
					return next(err);
				}
	  		if(User){
					req.session.authenticated = true;
					req.session.User = User;
					return res.ok({"session":req.session},'tasks');
				}
				return res.badRequest({title:'Erro',message:'O email ou a senha estão incorretos'},'login');
			});
		}
	},

	logout: function (req, res) {
	  	req.session.authenticated = false;
			req.session.User = false;
			return res.redirect('login');
	},

	register: function (req,res){

		if(!req.param('username')|| !req.param('password')){
			res.badRequest({title:'Erro',message:'O email ou a senha estão em branco'},'register');
		}
		else{
			User.findOne({username:req.param('username')})
			.exec(function findOneCB(err, User){
				if(err){
					return next(err);
				}
				if(User)
					return res.badRequest({title:'Erro',message:'Esse nome já está em uso'},'register');
			});

			User.create({username:req.param('username'),password:req.param('password')})
			.exec(function findOneCB(err, User){
				if(err){
					return next(err);
				}
	  		if(User){
					req.session.authenticated = true;
					req.session.User = User;
					return res.ok({"session":req.session},'tasks');
				}
				return res.badRequest({title:'Erro',message:'Ocorreu um erro interno'},'register');
			});
		}
	},

	getCurrent: function (req,res){
		if(req.session.authenticated){
			User.findOne({id:req.session.User.id})
			.exec(function findOneCB(err, User){
				if(err){
					return next(err);
				}
	  		if(User){
					req.session.User = User;
					req.session.save();
					return res.ok({"username":req.session.User.username,
												 "id":req.session.User.id});
				}
			});
		}
		else {
			return res.badRequest(false);
		}

	},

};
