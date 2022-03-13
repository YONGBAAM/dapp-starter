// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "contracts/MintAnimalToken.sol";
contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAnimalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    mapping(uint256 => uint256) public animalTokenPrices;

    uint256[] public onSaleAnimalTokenArray;

    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");
        require(_price > 0, "Price is zero or lower.");
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale.");
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, 
        address(this)), "Animal token owner did not approve token.");// 이 주인이 컨트랙트에 권한을 넘겼는지. 이상한 컨트랙으로 안가게. 

        animalTokenPrices[_animalTokenId] = _price;

        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    function purchaseAnimalToken(uint256 _animalTokenId) public payable {
        uint256 price = animalTokenPrices[_animalTokenId];
        address animalTokenOnwer = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        require(price > 0, "Animal token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");// 보낼때 토큰양
        require(animalTokenOnwer != msg.sender, "Caller is animal token owner.");

        payable(animalTokenOnwer).transfer(msg.value); // 주인에게 감. 
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOnwer, msg.sender, _animalTokenId);

        animalTokenPrices[_animalTokenId] = 0;

        for(uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            // 이거 맵으로 만들수있을까?
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                onSaleAnimalTokenArray.pop();
                
            }
        }
    }

    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) { // 읽기전용이라는 뜻이 뭐ㅣㅈ?
        return onSaleAnimalTokenArray.length;
    }

    function getAnimalTokenPrice(uint256 _animalTokenId) view public returns (uint256) {
        return animalTokenPrices[_animalTokenId];
    }

} 