// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChessToken is ERC20, Ownable {

    mapping(address => uint256) private MeStakes;
    mapping(address => uint256) private mostRecentStake;
    uint256 private _rewardRate = 5;
    uint256 private lockInPeriod = 60; 

    constructor(address initialOwner) 
        ERC20("ChessToken", "CHES") 
        Ownable(initialOwner)
    {}

    function minttoCHES(address to, uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;
        _mint(to, adjustedAmount);
    }

    function staketoCHES(uint256 amount) public {
        uint256 adjustedAmount = amount * 1e18;

        require(adjustedAmount > 0, "The stake amount should exceed zero");
        require(balanceOf(msg.sender) >= adjustedAmount, "Insufficient balance for the stake");

        MeStakes[msg.sender] += adjustedAmount;
        mostRecentStake[msg.sender] = block.timestamp;
        _transfer(msg.sender, address(this), adjustedAmount);
  }

    function makeStake(address account) public view returns (uint256) {
        uint256 stakedInWei = MeStakes[account];
        uint256 stakedInEth = stakedInWei / 1e18;
        return stakedInEth;
  }

    function withdrawStake() public {
        require(block.timestamp > (mostRecentStake[msg.sender] + lockInPeriod), "During the lock-in period, it is not possible to make fund withdrawals.");
        require(MeStakes[msg.sender] > 0, "There are no tokens currently staked");

        uint256 stakedAmount = MeStakes[msg.sender];
        uint256 reward = ((block.timestamp - mostRecentStake[msg.sender]) * _rewardRate) * 1e18;

        MeStakes[msg.sender] = 0;
        _transfer(address(this), msg.sender, stakedAmount);
        _mint(msg.sender, reward);
  }

    function fetchWithdrawa(address account) public view returns (uint256) {
        uint256 stakedAmount = MeStakes[msg.sender] / 1e18;
        uint256 reward = ((block.timestamp - mostRecentStake[account]) * _rewardRate);

        uint256 total = reward + stakedAmount; 
        return total;
  }

     function getElapsedStakeTime(address account) public view returns (uint256) {
        uint256 time = (block.timestamp - mostRecentStake[account]);
        return time;
  } 

    function getmostRecentStake(address account) public view returns (uint256) {
        return mostRecentStake[account];
  }
}