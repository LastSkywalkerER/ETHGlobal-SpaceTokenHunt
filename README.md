# Documentation for the SpaceTokenHunt project

# Abstract

**LTV** - the Maximum LTV ratio represents the maximum borrowing power of a specific collateral. 
For example, if a collateral has an LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.

**Health Factor** - crucial metric representing the safety of a user's borrowed position. It is calculated based on the ratio of the total collateral value 
a user has provided to the platform against the total value of assets they have borrowed. Essentially, the Health Factor indicates the level of risk associated with the user's position. 
A higher Health Factor means a safer position, reducing the likelihood of the position being liquidated. If the Health Factor falls below a certain threshold (typically 1), it signals a high risk of liquidation, 
where the user's collateral might be sold off to repay the borrowed assets. This metric helps users manage their borrowing and lending activities, 
ensuring they maintain a healthy balance between the assets borrowed and the collateral provided.

**Liquidation threshold** - this is the threshold at which a loan position will be considered undercollateralized and subject to liquidation for each collateral. For example, ETH collateral has a liquidation threshold of 82.5%, meaning that the position will be liquidated when the value of the debt is 82.5% of the value of the collateral.

**Liquidation penalty** - when liquidation takes place, liquidators recover up to 50% of the outstanding loan amount on behalf of the borrower. In return, they can buy the collateral at a discount and keep the difference (the liquidation penalty) as a bonus. For our ETH example, this is 5%.

# Problems

One of the team members, who is also an educator in the field of cryptocurrencies and DeFi, encountered a significant challenge while teaching these complex subjects. During their experience of instructing over 3000 students, they consistently faced the difficulty of effectively conveying intricate DeFi concepts such as collateralization, loan-to-value (LTV) ratios, and the Health Factor. Traditional educational methods often proved insufficient in fully capturing the dynamic nature of DeFi markets and the practical implications of these concepts.

This problem is further compounded by the abstract and often complex nature of DeFi, which can be daunting for newcomers. The educator noticed a gap in practical, interactive learning tools that could simplify and demystify DeFi for students. Many learners struggled to grasp the full extent of risk management in DeFi, particularly regarding asset collateralization and the impact of market volatility.

# Proposed solution

Recognizing these educational challenges, the team member was inspired to create a solution that could bridge this gap. The game concept was thus born out of a need for a more engaging, intuitive, and risk-free way to educate users about DeFi. By gamifying the learning experience, the game aims to make DeFi concepts more accessible and relatable, offering a hands-on approach to understanding and navigating the DeFi ecosystem. This initiative reflects a commitment to improving financial literacy in the DeFi space, empowering users to make informed decisions in their DeFi engagements.

# Gameplay

![2024-01-21_123510](https://github.com/LastSkywalkerER/ETHGlobal-SpaceTokenHunt/assets/156608212/d143c833-11aa-4668-bfe9-6b1016609663)


The proposed game begins with the player selecting an initial asset to deposit as their starting balance as well as native cryptocurrency, to pay for transactions.. This balance, represented in a chosen token, sets the limit for their in-game wallet expenditure. However, it's crucial to note that these assets are not immediately provided as collateral; they merely constitute the player's balance.

![2024-01-21_124908](https://github.com/LastSkywalkerER/ETHGlobal-SpaceTokenHunt/assets/156608212/4ff23dbe-e475-469d-a9f7-87a0a5655a63)


As the player navigates the game, they encounter various "bubbles" representing different tockens, they can be providing as a collateral or taking as a loans. Players use four types of laser shots to interact with these tokens: one color for collateralizing a token (opening a deposit), another for borrowing the token, a third to repay the loan and a fourth to withdraw the deposit.

![2024-01-21_130330](https://github.com/LastSkywalkerER/ETHGlobal-SpaceTokenHunt/assets/156608212/2ea092c1-858e-48ec-9ad9-05543c51aa75)


A key aspect of the gameplay involves matching the asset type: if the player attempts to provide an asset different from their initial deposit, an error message indicates that they cannot use this asset for collateral. Similarly, attempting to take a loan without first providing collateral also results in an error.

The correct initial action for the player is to find and interact with a token that matches the asset they initially deposited. Upon successfully shooting this bubble, the player's balance is provided as collateral to a smart contract, activating key parameters like the Health Factor and Net worth, which are displayedon head of screen.

Once the player has provided collateral, they can start taking loans by shooting at bubbles representing different loanable assets. Since they have collateral in place, they can now borrow any asset. After acquiring a loaned asset, the player can opt to provide it back as collateral, enabling a strategy to build a "liquidity pyramid."

To bring variety and strategic depth to the gameplay, bubbles can be differentiated not only by asset type but also by percentage of assets, for example, the user can customize the size of the interaction by setting the percentage of available assets. This feature will allow players to fine tune their strategies and manage their portfolio.

The game's core challenge is maintaining a healthy Health Factor, which decreases with each borrowed asset. If the Health Factor approaches or falls below 1.5, the game ends, and the player's spaceship is destroyed. The game concludes with a summary of the player's impact on the total value locked (TVL) in DeFi, illustrating how they increased their portfolio through various borrowing and collateral actions, thereby contributing to the DeFi liquidity pyramid.

The game could feature multiple modes, including an educational mode, and a real mode, where each action might constitute an actual transaction in the DeFi ecosystem. This diversity in gameplay modes offers varying levels of engagement and learning opportunities for players with different levels of familiarity with DeFi concepts.

Overall, this game aims to educate players about DeFi strategies and risk management in an interactive and engaging environment, using gamification to demystify complex financial concepts and encourage prudent financial behaviour in the DeFi space.

Overall, this game aims to educate players about DeFi strategies and risk management in an interactive and engaging environment, using gamification to demystify complex financial concepts and encourage prudent financial behaviour in the DeFi space.

