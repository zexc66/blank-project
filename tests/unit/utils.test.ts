import { describe, it, expect } from 'vitest'
import { isRTL } from '../../i18n/config'

describe('i18n config', () => {
  it('ar is RTL', () => {
    expect(isRTL('ar')).toBe(true)
  })
  it('en is LTR', () => {
    expect(isRTL('en')).toBe(false)
  })
})