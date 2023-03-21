const AdsMarket = artifacts.require('AdsMarket')
const ContentModeration = artifacts.require('ContentModeration')
const MediaNFT = artifacts.require('MediaNFT')
const Post = artifacts.require('Post')
const RNG = artifacts.require('RNG')
const Token = artifacts.require('Token')
const User = artifacts.require('User')

module.exports = async (deployer, network, accounts) => {
	await deployer.deploy(RNG)
	await deployer.deploy(Token)
	await deployer.deploy(MediaNFT)
	await deployer.deploy(Post, RNG.address, MediaNFT.address, Token.address)
	await deployer.deploy(AdsMarket, Post.address, Token.address)
	await deployer.deploy(User, Post.address)
	await deployer.deploy(ContentModeration, RNG.address, Post.address, Token.address)
	const mediaNFT = await MediaNFT.deployed()
	await mediaNFT.setPostContract(Post.address)
	const post = await Post.deployed()
	await post.setUserContract(User.address)
	await post.setAdContract(AdsMarket.address)
	await post.setContentModerationContract(ContentModeration.address)
}

