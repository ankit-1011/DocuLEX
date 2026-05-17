// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


contract DocumentStorage {

    struct Document {
        string cid;
        string fileName;
        address owner;
        uint256 timestamp;
    }

    Document[] public documents;

    event DocumentUploaded(
        address indexed user,
        string cid,
        string fileName,
        uint256 timestamp
    );

    function uploadDocument(
        string memory _cid,
        string memory _fileName
    ) public {

        documents.push(
            Document(
                _cid,
                _fileName,
                msg.sender,
                block.timestamp
            )
        );

        emit DocumentUploaded(
            msg.sender,
            _cid,
            _fileName,
            block.timestamp
        );
    }

    function getDocuments() public view returns(Document[] memory) {
        return documents;
    }
}