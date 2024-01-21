export const CALLER_NOT_POOL_ADMIN = "1"; // 'The caller of the function is not a pool admin'
export const CALLER_NOT_EMERGENCY_ADMIN = "2"; // 'The caller of the function is not an emergencyadmin'
export const CALLER_NOT_POOL_OR_EMERGENCY_ADMIN = "3"; // 'The caller of the function is not a pool oremergency admin'
export const CALLER_NOT_RISK_OR_POOL_ADMIN = "4"; // 'The caller of the function is not a risk or pooladmin'
export const CALLER_NOT_ASSET_LISTING_OR_POOL_ADMIN = "5"; // 'The caller of the function is not anasset listing or pool admin'
export const CALLER_NOT_BRIDGE = "6"; // 'The caller of the function is not a bridge'
export const ADDRESSES_PROVIDER_NOT_REGISTERED = "7"; // 'Pool addresses provider is not registered'
export const INVALID_ADDRESSES_PROVIDER_ID = "8"; // 'Invalid id for the pool addresses provider'
export const NOT_CONTRACT = "9"; // 'Address is not a contract'
export const CALLER_NOT_POOL_CONFIGURATOR = "10"; // 'The caller of the function is not the poolconfigurator'
export const CALLER_NOT_ATOKEN = "11"; // 'The caller of the function is not an AToken'
export const INVALID_ADDRESSES_PROVIDER = "12"; // 'The address of the pool addresses provider isinvalid'
export const INVALID_FLASHLOAN_EXECUTOR_RETURN = "13"; // 'Invalid return value of the flashloanexecutor function'
export const RESERVE_ALREADY_ADDED = "14"; // 'Reserve has already been added to reserve list'
export const NO_MORE_RESERVES_ALLOWED = "15"; // 'Maximum amount of reserves in the pool reached'
export const EMODE_CATEGORY_RESERVED = "16"; // 'Zero eMode category is reserved for volatileheterogeneous assets'
export const INVALID_EMODE_CATEGORY_ASSIGNMENT = "17"; // 'Invalid eMode category assignment to asset'
export const RESERVE_LIQUIDITY_NOT_ZERO = "18"; // 'The liquidity of the reserve needs to be 0'
export const FLASHLOAN_PREMIUM_INVALID = "19"; // 'Invalid flashloan premium'
export const INVALID_RESERVE_PARAMS = "20"; // 'Invalid risk parameters for the reserve'
export const INVALID_EMODE_CATEGORY_PARAMS = "21"; // 'Invalid risk parameters for the eMode category'
export const BRIDGE_PROTOCOL_FEE_INVALID = "22"; // 'Invalid bridge protocol fee'
export const CALLER_MUST_BE_POOL = "23"; // 'The caller of this function must be a pool'
export const INVALID_MINT_AMOUNT = "24"; // 'Invalid amount to mint'
export const INVALID_BURN_AMOUNT = "25"; // 'Invalid amount to burn'
export const INVALID_AMOUNT = "26"; // 'Amount must be greater than 0'
export const RESERVE_INACTIVE = "27"; // 'Action requires an active reserve'
export const RESERVE_FROZEN = "28"; // 'Action cannot be performed because the reserve is frozen'
export const RESERVE_PAUSED = "29"; // 'Action cannot be performed because the reserve is paused'
export const BORROWING_NOT_ENABLED = "30"; // 'Borrowing is not enabled'
export const STABLE_BORROWING_NOT_ENABLED = "31"; // 'Stable borrowing is not enabled'
export const NOT_ENOUGH_AVAILABLE_USER_BALANCE = "32"; // 'User cannot withdraw more than theavailable balance'
export const INVALID_INTEREST_RATE_MODE_SELECTED = "33"; // 'Invalid interest rate mode selected'
export const COLLATERAL_BALANCE_IS_ZERO = "34"; // 'The collateral balance is 0'
export const HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD = "35"; // 'Health factor is lesser thanthe liquidation threshold'
export const COLLATERAL_CANNOT_COVER_NEW_BORROW = "36"; // 'There is not enough collateral to cover anew borrow'
export const COLLATERAL_SAME_AS_BORROWING_CURRENCY = "37"; // 'Collateral is (mostly) the samecurrency that is being borrowed'
export const AMOUNT_BIGGER_THAN_MAX_LOAN_SIZE_STABLE = "38"; // 'The requested amount is greater thanthe max loan size in stable rate mode'
export const NO_DEBT_OF_SELECTED_TYPE = "39"; // 'For repayment of a specific type of debt, the userneeds to have debt that type'
export const NO_EXPLICIT_AMOUNT_TO_REPAY_ON_BEHALF = "40"; // 'To repay on behalf of a user anexplicit amount to repay is needed'
export const NO_OUTSTANDING_STABLE_DEBT = "41"; // 'User does not have outstanding stable rate debt onthis reserve'
export const NO_OUTSTANDING_VARIABLE_DEBT = "42"; // 'User does not have outstanding variable ratedebt on this reserve'
export const UNDERLYING_BALANCE_ZERO = "43"; // 'The underlying balance needs to be greater than 0'
export const INTEREST_RATE_REBALANCE_CONDITIONS_NOT_MET = "44"; // 'Interest rate rebalance conditionswere not met'
export const HEALTH_FACTOR_NOT_BELOW_THRESHOLD = "45"; // 'Health factor is not below the threshold'
export const COLLATERAL_CANNOT_BE_LIQUIDATED = "46"; // 'The collateral chosen cannot be liquidated'
export const SPECIFIED_CURRENCY_NOT_BORROWED_BY_USER = "47"; // 'User did not borrow the specifiedcurrency'
export const SAME_BLOCK_BORROW_REPAY = "48"; // 'Borrow and repay in same block is not allowed'
export const INCONSISTENT_FLASHLOAN_PARAMS = "49"; // 'Inconsistent flashloan parameters'
export const BORROW_CAP_EXCEEDED = "50"; // 'Borrow cap is exceeded'
export const SUPPLY_CAP_EXCEEDED = "51"; // 'Supply cap is exceeded'
export const UNBACKED_MINT_CAP_EXCEEDED = "52"; // 'Unbacked mint cap is exceeded'
export const DEBT_CEILING_EXCEEDED = "53"; // 'Debt ceiling is exceeded'
export const ATOKEN_SUPPLY_NOT_ZERO = "54"; // 'AToken supply is not zero'
export const STABLE_DEBT_NOT_ZERO = "55"; // 'Stable debt supply is not zero'
export const VARIABLE_DEBT_SUPPLY_NOT_ZERO = "56"; // 'Variable debt supply is not zero'
export const LTV_VALIDATION_FAILED = "57"; // 'Ltv validation failed'
export const INCONSISTENT_EMODE_CATEGORY = "58"; // 'Inconsistent eMode category'
export const PRICE_ORACLE_SENTINEL_CHECK_FAILED = "59"; // 'Price oracle sentinel validation failed'
export const ASSET_NOT_BORROWABLE_IN_ISOLATION = "60"; // 'Asset is not borrowable in isolation mode'
export const RESERVE_ALREADY_INITIALIZED = "61"; // 'Reserve has already been initialized'
export const USER_IN_ISOLATION_MODE = "62"; // 'User is in isolation mode'
export const INVALID_LTV = "63"; // 'Invalid ltv parameter for the reserve'
export const INVALID_LIQ_THRESHOLD = "64"; // 'Invalid liquidity threshold parameter for the reserve'
export const INVALID_LIQ_BONUS = "65"; // 'Invalid liquidity bonus parameter for the reserve'
export const INVALID_DECIMALS = "66"; // 'Invalid decimals parameter of the underlying asset of thereserve'
export const INVALID_RESERVE_FACTOR = "67"; // 'Invalid reserve factor parameter for the reserve'
export const INVALID_BORROW_CAP = "68"; // 'Invalid borrow cap for the reserve'
export const INVALID_SUPPLY_CAP = "69"; // 'Invalid supply cap for the reserve'
export const INVALID_LIQUIDATION_PROTOCOL_FEE = "70"; // 'Invalid liquidation protocol fee for thereserve'
export const INVALID_EMODE_CATEGORY = "71"; // 'Invalid eMode category for the reserve'
export const INVALID_UNBACKED_MINT_CAP = "72"; // 'Invalid unbacked mint cap for the reserve'
export const INVALID_DEBT_CEILING = "73"; // 'Invalid debt ceiling for the reserve
export const INVALID_RESERVE_INDEX = "74"; // 'Invalid reserve index'
export const ACL_ADMIN_CANNOT_BE_ZERO = "75"; // 'ACL admin cannot be set to the zero address'
export const INCONSISTENT_PARAMS_LENGTH = "76"; // 'Array parameters that should be equal length arenot'
export const ZERO_ADDRESS_NOT_VALID = "77"; // 'Zero address not valid'
export const INVALID_EXPIRATION = "78"; // 'Invalid expiration'
export const INVALID_SIGNATURE = "79"; // 'Invalid signature'
export const OPERATION_NOT_SUPPORTED = "80"; // 'Operation not supported'
export const DEBT_CEILING_NOT_ZERO = "81"; // 'Debt ceiling is not zero'
export const ASSET_NOT_LISTED = "82"; // 'Asset is not listed'
export const INVALID_OPTIMAL_USAGE_RATIO = "83"; // 'Invalid optimal usage ratio'
export const INVALID_OPTIMAL_STABLE_TO_TOTAL_DEBT_RATIO = "84"; // 'Invalid optimal stable to totaldebt ratio'
export const UNDERLYING_CANNOT_BE_RESCUED = "85"; // 'The underlying asset cannot be rescued'
export const ADDRESSES_PROVIDER_ALREADY_ADDED = "86"; // 'Reserve has already been added to reservelist'
export const POOL_ADDRESSES_DO_NOT_MATCH = "87"; // 'The token implementation pool address and thepool address provided by the initializing pool do not match'
export const STABLE_BORROWING_ENABLED = "88"; // 'Stable borrowing is enabled'
export const SILOED_BORROWING_VIOLATION = "89"; // 'User is trying to borrow multiple assets includinga siloed one'
export const RESERVE_DEBT_NOT_ZERO = "90"; // the total debt of the reserve needs to be 0

export const aaveErrorMessages: Record<string, string> = {
  [CALLER_NOT_POOL_ADMIN]: "The caller of the function is not a pool admin",
  [CALLER_NOT_EMERGENCY_ADMIN]: "The caller of the function is not an emergency admin",
  [CALLER_NOT_POOL_OR_EMERGENCY_ADMIN]:
    "The caller of the function is not a pool or emergency admin",
  [CALLER_NOT_RISK_OR_POOL_ADMIN]: "The caller of the function is not a risk or pool admin",
  [CALLER_NOT_ASSET_LISTING_OR_POOL_ADMIN]:
    "The caller of the function is not an asset listing or pool admin",
  [CALLER_NOT_BRIDGE]: "The caller of the function is not a bridge",
  [ADDRESSES_PROVIDER_NOT_REGISTERED]: "Pool addresses provider is not registered",
  [INVALID_ADDRESSES_PROVIDER_ID]: "Invalid id for the pool addresses provider",
  [NOT_CONTRACT]: "Address is not a contract",
  [CALLER_NOT_POOL_CONFIGURATOR]: "The caller of the function is not the pool configurator",
  [CALLER_NOT_ATOKEN]: "The caller of the function is not an AToken",
  [INVALID_ADDRESSES_PROVIDER]: "The address of the pool addresses provider is invalid",
  [INVALID_FLASHLOAN_EXECUTOR_RETURN]: "Invalid return value of the flashloan executor function",
  [RESERVE_ALREADY_ADDED]: "Reserve has already been added to reserve list",
  [NO_MORE_RESERVES_ALLOWED]: "Maximum amount of reserves in the pool reached",
  [EMODE_CATEGORY_RESERVED]: "Zero eMode category is reserved for volatile heterogeneous assets",
  [INVALID_EMODE_CATEGORY_ASSIGNMENT]: "Invalid eMode category assignment to asset",
  [RESERVE_LIQUIDITY_NOT_ZERO]: "The liquidity of the reserve needs to be 0",
  [FLASHLOAN_PREMIUM_INVALID]: "Invalid flashloan premium",
  [INVALID_RESERVE_PARAMS]: "Invalid risk parameters for the reserve",
  [INVALID_EMODE_CATEGORY_PARAMS]: "Invalid risk parameters for the eMode category",
  [BRIDGE_PROTOCOL_FEE_INVALID]: "Invalid bridge protocol fee",
  [CALLER_MUST_BE_POOL]: "The caller of this function must be a pool",
  [INVALID_MINT_AMOUNT]: "Invalid amount to mint",
  [INVALID_BURN_AMOUNT]: "Invalid amount to burn",
  [INVALID_AMOUNT]: "Amount must be greater than 0",
  [RESERVE_INACTIVE]: "Action requires an active reserve",
  [RESERVE_FROZEN]: "Action cannot be performed because the reserve is frozen",
  [RESERVE_PAUSED]: "Action cannot be performed because the reserve is paused",
  [BORROWING_NOT_ENABLED]: "Borrowing is not enabled",
  [STABLE_BORROWING_NOT_ENABLED]: "Stable borrowing is not enabled",
  [NOT_ENOUGH_AVAILABLE_USER_BALANCE]: "User cannot withdraw more than the available balance",
  [INVALID_INTEREST_RATE_MODE_SELECTED]: "Invalid interest rate mode selected",
  [COLLATERAL_BALANCE_IS_ZERO]: "The collateral balance is 0",
  [HEALTH_FACTOR_LOWER_THAN_LIQUIDATION_THRESHOLD]:
    "Health factor is lesser than the liquidation threshold",
  [COLLATERAL_CANNOT_COVER_NEW_BORROW]: "There is not enough collateral to cover a new borrow",
  [COLLATERAL_SAME_AS_BORROWING_CURRENCY]:
    "Collateral is (mostly) the same currency that is being borrowed",
  [AMOUNT_BIGGER_THAN_MAX_LOAN_SIZE_STABLE]:
    "The requested amount is greater than the max loan size in stable rate mode",
  [NO_DEBT_OF_SELECTED_TYPE]:
    "For repayment of a specific type of debt, the user needs to have debt that type",
  [NO_EXPLICIT_AMOUNT_TO_REPAY_ON_BEHALF]:
    "To repay on behalf of a user an explicit amount to repay is needed",
  [NO_OUTSTANDING_STABLE_DEBT]: "User does not have outstanding stable rate debt on this reserve",
  [NO_OUTSTANDING_VARIABLE_DEBT]:
    "User does not have outstanding variable rate debt on this reserve",
  [UNDERLYING_BALANCE_ZERO]: "The underlying balance needs to be greater than 0",
  [INTEREST_RATE_REBALANCE_CONDITIONS_NOT_MET]: "Interest rate rebalance conditions were not met",
  [HEALTH_FACTOR_NOT_BELOW_THRESHOLD]: "Health factor is not below the threshold",
  [COLLATERAL_CANNOT_BE_LIQUIDATED]: "The collateral chosen cannot be liquidated",
  [SPECIFIED_CURRENCY_NOT_BORROWED_BY_USER]: "User did not borrow the specified currency",
  [SAME_BLOCK_BORROW_REPAY]: "Borrow and repay in same block is not allowed",
  [INCONSISTENT_FLASHLOAN_PARAMS]: "Inconsistent flashloan parameters",
  [BORROW_CAP_EXCEEDED]: "Borrow cap is exceeded",
  [SUPPLY_CAP_EXCEEDED]: "Supply cap is exceeded",
  [UNBACKED_MINT_CAP_EXCEEDED]: "Unbacked mint cap is exceeded",
  [DEBT_CEILING_EXCEEDED]: "Debt ceiling is exceeded",
  [ATOKEN_SUPPLY_NOT_ZERO]: "AToken supply is not zero",
  [STABLE_DEBT_NOT_ZERO]: "Stable debt supply is not zero",
  [VARIABLE_DEBT_SUPPLY_NOT_ZERO]: "Variable debt supply is not zero",
  [LTV_VALIDATION_FAILED]: "Ltv validation failed",
  [INCONSISTENT_EMODE_CATEGORY]: "Inconsistent eMode category",
  [PRICE_ORACLE_SENTINEL_CHECK_FAILED]: "Price oracle sentinel validation failed",
  [ASSET_NOT_BORROWABLE_IN_ISOLATION]: "Asset is not borrowable in isolation mode",
  [RESERVE_ALREADY_INITIALIZED]: "Reserve has already been initialized",
  [USER_IN_ISOLATION_MODE]: "User is in isolation mode",
  [INVALID_LTV]: "Invalid ltv parameter for the reserve",
  [INVALID_LIQ_THRESHOLD]: "Invalid liquidity threshold parameter for the reserve",
  [INVALID_LIQ_BONUS]: "Invalid liquidity bonus parameter for the reserve",
  [INVALID_DECIMALS]: "Invalid decimals parameter of the underlying asset of the reserve",
  [INVALID_RESERVE_FACTOR]: "Invalid reserve factor parameter for the reserve",
  [INVALID_BORROW_CAP]: "Invalid borrow cap for the reserve",
  [INVALID_SUPPLY_CAP]: "Invalid supply cap for the reserve",
  [INVALID_LIQUIDATION_PROTOCOL_FEE]: "Invalid liquidation protocol fee for the reserve",
  [INVALID_EMODE_CATEGORY]: "Invalid eMode category for the reserve",
  [INVALID_UNBACKED_MINT_CAP]: "Invalid unbacked mint cap for the reserve",
  [INVALID_DEBT_CEILING]: "Invalid debt ceiling for the reserve",
  [INVALID_RESERVE_INDEX]: "Invalid reserve index",
  [ACL_ADMIN_CANNOT_BE_ZERO]: "ACL admin cannot be set to the zero address",
  [INCONSISTENT_PARAMS_LENGTH]: "Array parameters that should be equal length are not",
  [ZERO_ADDRESS_NOT_VALID]: "Zero address not valid",
  [INVALID_EXPIRATION]: "Invalid expiration",
  [INVALID_SIGNATURE]: "Invalid signature",
  [OPERATION_NOT_SUPPORTED]: "Operation not supported",
  [DEBT_CEILING_NOT_ZERO]: "Debt ceiling is not zero",
  [ASSET_NOT_LISTED]: "Asset is not listed",
  [INVALID_OPTIMAL_USAGE_RATIO]: "Invalid optimal usage ratio",
  [INVALID_OPTIMAL_STABLE_TO_TOTAL_DEBT_RATIO]: "Invalid optimal stable to total debt ratio",
  [UNDERLYING_CANNOT_BE_RESCUED]: "The underlying asset cannot be rescued",
  [ADDRESSES_PROVIDER_ALREADY_ADDED]: "Reserve has already been added to reserve list",
  [POOL_ADDRESSES_DO_NOT_MATCH]:
    "The token implementation pool address and the pool address provided by the initializing pool do not match",
  [STABLE_BORROWING_ENABLED]: "Stable borrowing is enabled",
  [SILOED_BORROWING_VIOLATION]: "User is trying to borrow multiple assets including a siloed one",
  [RESERVE_DEBT_NOT_ZERO]: "The total debt of the reserve needs to be 0",
};
