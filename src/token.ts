import {
  Transfer as TransferEvent, 
  Token as TokenContract,
  ColorCreated as ColorCreatedEvent
} from "../generated/Token/Token"

import {
	Token, User
} from "../generated/schema"

import {BigInt, ipfs, json} from '@graphprotocol/graph-ts'

export function handleTransfer(event: TransferEvent): void { 
	let token = Token.load(event.params.tokenId.toString())

	if (!token) { 
		token = new Token(event.params.tokenId.toString());
		token.tokenID = event.params.tokenId;
	}

	token.updatedAt = event.block.timestamp;
	token.owner = event.params.to.toHexString();
	token.save();

	let user = User.load(event.params.to.toHexString());
	
	if (!user) { 
		user = new User(event.params.to.toHexString());
		user.save();
	}
}

// ColorCreated (address _from, uint256 _id, uint256 _rgb, string _name)

export function handleColorCreated(event: ColorCreatedEvent): void { 
	let token = Token.load(event.params._id.toString());

	if (!token) { 
		token = new Token(event.params._id.toString());
		token.tokenID = event.params._id;
	}
	token.name = event.params._name;
	token.rgb = event.params._rgb;


	token.updatedAt = event.block.timestamp;
	// token.owner = event.params.to.toHexString();
	token.save();
}