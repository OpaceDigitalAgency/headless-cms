import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyFilters,
  applySort,
  normalizeMetaValue,
  parseSeoId,
  validateSeoFields,
} from '../src/endpoints/seo'

describe('SEO endpoints helpers', () => {
  it('parses composite ids', () => {
    assert.deepEqual(parseSeoId('pages:123'), { collection: 'pages', id: 123 })
    assert.deepEqual(parseSeoId('posts:abc'), { collection: 'posts', id: 'abc' })
    assert.equal(parseSeoId('invalid'), null)
  })

  it('normalizes meta values', () => {
    assert.equal(normalizeMetaValue(''), null)
    assert.equal(normalizeMetaValue('   '), null)
    assert.equal(normalizeMetaValue(' Title '), 'Title')
    assert.equal(normalizeMetaValue(null), null)
    assert.equal(normalizeMetaValue(undefined), undefined)
  })

  it('validates meta length thresholds', () => {
    assert.equal(validateSeoFields('ok', 'desc'), null)
    assert.ok(validateSeoFields('a'.repeat(301), 'desc')?.includes('Meta title'))
    assert.ok(validateSeoFields('ok', 'a'.repeat(1001))?.includes('Meta description'))
  })

  it('filters items by query and missing meta', () => {
    const items = [
      { id: 'pages:1', type: 'pages', h1: 'Home', slug: '/', metaTitle: null, metaDescription: 'Welcome' },
      { id: 'posts:2', type: 'posts', h1: 'Post', slug: '/posts/post', metaTitle: 'Post', metaDescription: null },
    ]
    const missingTitle = applyFilters(items, { missingTitle: true })
    assert.equal(missingTitle.length, 1)
    assert.equal(missingTitle[0].id, 'pages:1')

    const search = applyFilters(items, { query: 'posts' })
    assert.equal(search.length, 1)
    assert.equal(search[0].id, 'posts:2')
  })

  it('sorts items by requested field', () => {
    const items = [
      { id: 'a', h1: 'Beta', slug: '/b', metaTitle: 'b', metaDescription: 'b', updatedAt: '2024-01-02' },
      { id: 'b', h1: 'Alpha', slug: '/a', metaTitle: 'a', metaDescription: 'a', updatedAt: '2024-01-01' },
    ]
    const sorted = applySort(items, 'h1', 'asc')
    assert.equal(sorted[0].id, 'b')
  })
})
