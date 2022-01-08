//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";
contract MetaMoose is ERC721URIStorage{
    address public owner;
    uint constant public TOTAL_SUPPLY = 200;

    string private _baseUri;
    uint[TOTAL_SUPPLY] private _tokenIds;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIndex;

    event MooseMinted(address indexed recipient, uint256 tokenId);

    constructor(uint[200] memory _randomTokenIds) ERC721("MetaMoose", "MM") {
        _baseUri = "ipfs://Qma2K3U69cyzAQyTdTNfELx6u9kXKokHkMYEnEffciCUZY/";
        _tokenIds = _randomTokenIds;
        owner = msg.sender;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }

    function totalSupply() public pure returns (uint) {
        return TOTAL_SUPPLY;
    }

    function amountRemaining() public view returns (uint){
        return TOTAL_SUPPLY - _tokenIndex.current();
    }

    function mintMoose(address _recipient) public {
        uint256 _index = _tokenIndex.current();
        require(_index < TOTAL_SUPPLY, "Soldout");
        uint256 _tokenId = _tokenIds[_index];
        _mint(_recipient, _tokenId);
        _setTokenURI(_tokenId, string(abi.encodePacked(Strings.toString(_tokenId), ".json")));
        _tokenIndex.increment();
        emit MooseMinted(msg.sender, _tokenId);
    }
}

