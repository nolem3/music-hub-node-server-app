import model from "./model.js";
export const createFollow = (follow) => model.create(follow);
export const findAllFollows = () => model.find();
export const findFollowByPair = (follower, followed) => model.findOne({ follower: follower, followed: followed });
export const findFollowsByFollower = (follower) => model.find({ follower: follower })
export const findFollowsByFollowed = (followed) => model.find({ followed: followed })
export const deleteFollow = (id) => model.deleteOne({ _id: id });
export const deleteFollowByPair = (follower, followed) => model.deleteOne({ follower: follower, followed: followed });