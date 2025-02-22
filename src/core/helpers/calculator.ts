import { numberConstants, VND_CURRENCY_UNIT } from '@/configs/consts'
import { isEqual, isNil, multiply, sum } from 'lodash'

export const toFixedNumber = (value: number, fractionDigits = numberConstants.TWO) => {
  if (isNil(value)) return undefined

  return Number(value.toFixed(fractionDigits))
}

export const sumWithFixed = (params: number[]) => {
  return toFixedNumber(sum(params), numberConstants.FOUR)
}

export const exchangeCurrencyWithFixed = (money: number, exchangeRate: number) => {
  return toFixedNumber(multiply(exchangeRate, money), numberConstants.ZERO)
}

export const multiplyWithFixed = (a: number, b: number) => {
  return toFixedNumber(multiply(a, b))
}

export const dividedWithFixed = (a: number, b: number) => {
  return toFixedNumber(a / b)
}

export const toFixedByCurrency = (value: number, currencyCode: string) => {
  return toFixedNumber(value, isEqual(currencyCode, VND_CURRENCY_UNIT) ? numberConstants.ZERO : undefined)
}
