// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Picture is ERC721URIStorage, Ownable {
    string private constant _name = "Picture NFT";
    string private constant _symbol = "PIC";

    constructor() ERC721(_name, _symbol) {}

    uint256 public _id;

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function totalSupply() public view returns (uint256) {
        return _id;
    }

    function mint(string memory _cid) public onlyOwner {
        uint256 newTokenId = ++_id;

        _safeMint(msg.sender, newTokenId, "");
        _setTokenURI(newTokenId, _cid);
    }
}
