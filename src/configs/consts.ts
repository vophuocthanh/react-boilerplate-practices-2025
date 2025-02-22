import dayjs from 'dayjs'

/**
 * Date-time constants
 */
export const STANDARD_DATE_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}?$/
export const STANDARD_TIME_REGEX = /^[0-9]{2}:[0-9]{2}?$/
export const STANDARD_DATE_TIME_REGEX_WITHOUT_TIMEZONE =
  /^[0-9]{4}-[0-9]{2}-[0-9]{2}[\sT][0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?$/
export const STANDARD_DATE_TIME_REGEX =
  /^([0-9]{4}-[0-9]{2}-[0-9]{2})[\sT]([0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{1,3})?)(Z|[+-][0-9]{2}:[0-9]{2})?$/
export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD'
export const STANDARD_DATE_FORMAT_INVERSE = 'DD-MM-YYYY'
export const STANDARD_DATE_FORMAT_US = 'MM-DD-YYYY'
export const STANDARD_DATE_FORMAT_SLASH = 'DD/MM/YYYY'
export const STANDARD_DATE_FORMAT_COMPACT = 'DDMMYYYY'
export const STANDARD_DATE_FORMAT_FULL = 'DD/MM/YYYY HH:mm'
export const STANDARD_DATE_FORMAT_FULL_TIME = 'DD-MM-YYYY HH:mm:ss'
export const VIETNAMESE_TIME_ZONE_OFFSET = 7
export const STANDARD_TIME_FORMAT = 'HH:mm:ss'
export const STANDARD_TIME_FORMAT_MM_YYYY = 'MM/YYYY'
export const STANDARD_TIME_FORMAT_MM_YYYY_INVERSE = 'MM-YYYY'
export const DEFAULT_DATETIME_VALUE = '0001-01-01T00:00:00'
export const STANDARD_DATE_TIME_FORMAT = `${STANDARD_DATE_FORMAT}${'T' + STANDARD_TIME_FORMAT + 'Z'}`
export const STANDARD_DATE_TIME_FORMAT_VIEW = `${STANDARD_DATE_FORMAT_INVERSE} ${STANDARD_TIME_FORMAT}`
export const TIMEZONE_OFFSET: string = dayjs().format('Z')
export const NAME_BANK_REGEX = /^[^\t\n"']*$/
export const ACCOUNT_BANK_REGEX = /^[a-zA-Z0-9]*$/
export const PHONE_NUMBER_REGEX = /^[0-9\s()+-]*$/
export const DESCRIPTION_REGEX = /^[^\t\n]*$/
export const CHARACTER_TAB_REGEX = /\s{2,}/
export const SUPPLIER_TAX_CODE_REGEX = /^([A-Za-z0-9\-_&]*)$/
export const NOT_TAB_ENTER_REGEX = /^[^\t\r\n]*$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const NOT_SPECIAL_CHARACTERS = /^[a-zA-Z0-9À-ỹ\s]*$/

/**
 * Debounce time constants
 */
export const DEBOUNCE_TIME_100 = 100

export const DEBOUNCE_TIME_150 = 150

export const DEBOUNCE_TIME_200 = 200

export const DEBOUNCE_TIME_250 = 250

export const DEBOUNCE_TIME_300 = 300

export const DEBOUNCE_TIME_350 = 350

export const DEBOUNCE_TIME_400 = 400

export const INPUT_DEBOUNCE_TIME = 400

/**
 * limit constants
 */
export const DEFAULT_LIMIT_WORD = 50
export const NOTIFICATION_LIMIT_WORD = 75
export const DEFAULT_PAGE_SIZE_OPTION = [10, 20, 30, 40, 50]

/**
 * Filter constants
 */
// export const DEFAULT_TAKE = 10;
export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_PAGE_SIZE_30 = 30

export const SPECIAL_CHARACTERS =
  /[ `!@#$%^&*()_+\-=[\]{};':"|,.<>/?~ẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]/

/**
 * url constants
 */

export const ACTION_URL_REGEX = /^(\/?rpc)/

/**
 * string empty constants
 */

export const EMPTY_STRING = '---'

/**
 * route constants
 */
export const ROOT_ROUTE: string = import.meta.env.BASE_URL
export const LOGIN_ROUTE = '/login'
export const LOGOUT_ROUTE = '/logout'

export const VERSION_WEB = '1.1.47'

export const SLASH = '/'

/**
 * size modal constants
 */

export const MODAL_WIDTH_1100 = 1100
export const MODAL_WIDTH_800 = 800

export const EMPTY_WIDTH_400 = 400

export const numberConstants = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  ONE_HUNDRED: 100
}

export const TIME_FORMAT = 'HH:mm'

export const TABLE_ROW_KEY = 'id'
export const WIDTH_400 = 400
export const WIDTH_600 = 600
export const WIDTH_800 = 800
export const WIDTH_1000 = 1000
export const WIDTH_1100 = 1100
export const MAX_LENGTH_20 = 20
export const MAX_LENGTH_255 = 255
export const MAX_LENGTH_500 = 500
export const MAX_LENGTH_1000 = 1000
export const MAX_LENGTH_2000 = 2000
export const API_DOWNLOAD_FILE = 'share/file/download'
export const MAX_LENGTH_TEXT_AREA = 500
export const MAX_LENGTH_REASON = MAX_LENGTH_TEXT_AREA

// type input number
export const NUMBER_TYPE_INPUT = 'DECIMAL'

// Vietnam dong unit
export const VND_CURRENCY_UNIT = 'VND'

// Japanese Yen (JPY) currency unit
export const JPY_CURRENCY_UNIT = 'JPY'

// type error
export const ERROR_TYPE = 'error'

// type day
export const DAY_TYPE = 'day'

export const datePickerPopupClassName = {
  first: 'date-picker-popup-1',
  second: 'date-picker-popup-2',
  three: 'date-picker-popup-3'
}

export const DATE_PLACEHOLDER = STANDARD_DATE_FORMAT_SLASH.toLowerCase()

// config role
export const ROLE_ADMIN = 'ADMIN'
export const ROLE_EMPLOYEE = 'EMPLOYEE'

// config type text
export const TEXT_TYPE = 'text'
export const NUMBER_TYPE = 'number'
export const PASSWORD_TYPE = 'password'
