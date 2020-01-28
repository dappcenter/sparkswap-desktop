import {
  RecurringBuy,
  WireRecurringBuy,
  Quote,
  WireQuote,
  Trade,
  WireTrade,
  UnsavedRecurringBuy,
  WireUnsavedRecurringBuy
} from './types'

export function deserializeQuoteFromWire (wireQuote: WireQuote): Quote {
  return {
    hash: wireQuote.hash,
    destinationAmount: wireQuote.destinationAmount,
    sourceAmount: wireQuote.sourceAmount,
    expiration: new Date(wireQuote.expiration)
  }
}

export function deserializeTradeFromWire (wireTrade: WireTrade): Trade {
  const partialTrade = deserializeQuoteFromWire(wireTrade)
  return {
    id: wireTrade.id,
    status: wireTrade.status,
    startTime: new Date(wireTrade.startTime),
    endTime: wireTrade.endTime ? new Date(wireTrade.endTime) : undefined,
    ...partialTrade
  }
}

export function serializeUnsavedRecurringBuyToWire (recurringBuy: UnsavedRecurringBuy): WireUnsavedRecurringBuy {
  return {
    amount: recurringBuy.amount,
    frequency: recurringBuy.frequency,
    referenceTime: recurringBuy.referenceTime.toISOString()
  }
}

export function deserializeUnsavedRecurringBuyFromWire (recurringBuy: WireUnsavedRecurringBuy): UnsavedRecurringBuy {
  return {
    amount: recurringBuy.amount,
    frequency: recurringBuy.frequency,
    referenceTime: new Date(recurringBuy.referenceTime)
  }
}

export function deserializeRecurringBuyFromWire (wireRecurringBuy: WireRecurringBuy): RecurringBuy {
  const partialRecurringBuy = deserializeUnsavedRecurringBuyFromWire(wireRecurringBuy)
  return {
    id: wireRecurringBuy.id,
    ...partialRecurringBuy
  }
}

export function serializeRecurringBuyToWire (recurringBuy: RecurringBuy): WireRecurringBuy {
  const partialWireRecurringBuy = serializeUnsavedRecurringBuyToWire(recurringBuy)
  return {
    id: recurringBuy.id,
    ...partialWireRecurringBuy
  }
}
