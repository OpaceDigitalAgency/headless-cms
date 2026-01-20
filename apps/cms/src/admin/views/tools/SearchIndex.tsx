import React from 'react'
import ToolPageLayout, { type ToolViewProps } from './ToolPageLayout'
import SearchIndexClient from './SearchIndexClient'

export const SearchIndex: React.FC<ToolViewProps> = (props) => (
  <ToolPageLayout
    {...props}
    title="Search Index"
    description="Monitor search index status and trigger reindexing."
  >
    <SearchIndexClient />
  </ToolPageLayout>
)

export default SearchIndex
