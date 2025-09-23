# Coin and Reward System Implementation

## Current Status: In Progress

### ✅ Completed:
- [ ] Analysis of existing reward system infrastructure
- [ ] Plan creation and approval

### 🔄 In Progress:
- [ ] Enhanced reward tracking functions in issueRewards.ts
- [ ] Coin/Reward UI component creation
- [ ] Account page updates with real reward data
- [ ] Issue submission → coin reward flow testing
- [ ] Coin to rupee conversion functionality
- [ ] Transaction history implementation

### 📋 Implementation Steps:

1. **Enhanced Reward System (`src/lib/issueRewards.ts`)**
   - [ ] Add function to automatically track and update issue counts
   - [ ] Add function to calculate available coins (5 issues = reward)
   - [ ] Add function to convert coins to rupees (1 coin = ₹10)
   - [ ] Add function to get user's total coins across all months

2. **Coin/Reward UI Component (`src/components/CoinRewardSection.tsx`)**
   - [ ] Display current coin balance
   - [ ] Show monthly progress (issues submitted this month)
   - [ ] Display reward eligibility status
   - [ ] Claim rewards button (when 5+ issues submitted)
   - [ ] Convert to rupees functionality
   - [ ] Transaction history

3. **Update Account Page (`src/pages/Account.tsx`)**
   - [ ] Replace hardcoded rewardsEarned with real data
   - [ ] Add dedicated coin/reward section for citizens
   - [ ] Show detailed breakdown of coins earned
   - [ ] Add conversion interface

4. **Database Integration**
   - [ ] Create function to automatically update user_issue_rewards when issues are submitted
   - [ ] Add coin balance field to profiles table (optional)
   - [ ] Create transaction history table for coin conversions

### 🎯 Reward Logic:
- 5 issues in a week = 10 coins reward
- 1 coin = ₹10 conversion rate
- Monthly reset of issue counts
- Claim system to prevent double claiming

### 📊 Testing Checklist:
- [ ] Issue submission triggers coin reward
- [ ] Coin balance updates correctly
- [ ] Reward claiming works
- [ ] Coin to rupee conversion
- [ ] UI displays correct information
- [ ] Monthly reset functionality
