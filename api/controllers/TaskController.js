/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findTasks: function (req,res){
		if(!req.param('keywords')){
			Task.find({ where: { author: req.session.User.id }})
			.exec(function search(err, Tasks){
				if(err){
					return next(err)
				}
				else{
					return res.ok(Tasks);
				}
			});
		}
		else {
			Task.find({ author : req.session.User.id ,
				 title: {'contains': req.param('keywords')} })
				.exec(function search(err, Tasks){
					if(err){
						return next(err)
					}
					else{
						return res.ok(Tasks);
					}
				});
			}
		}


};
