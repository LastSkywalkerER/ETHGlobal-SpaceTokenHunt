# Documentation for the SpaceTokenHunt project

# Abstract

**LTV** - the Maximum LTV ratio represents the maximum borrowing power of a specific collateral. 
For example, if a collateral has an LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.

**Health Factor** - crucial metric representing the safety of a user's borrowed position. It is calculated based on the ratio of the total collateral value 
a user has provided to the platform against the total value of assets they have borrowed. Essentially, the Health Factor indicates the level of risk associated with the user's position. 
A higher Health Factor means a safer position, reducing the likelihood of the position being liquidated. If the Health Factor falls below a certain threshold (typically 1), it signals a high risk of liquidation, 
where the user's collateral might be sold off to repay the borrowed assets. This metric helps users manage their borrowing and lending activities, 
ensuring they maintain a healthy balance between the assets borrowed and the collateral provided.
