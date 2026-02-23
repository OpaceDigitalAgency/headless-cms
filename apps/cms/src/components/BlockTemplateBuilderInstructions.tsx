// @ts-nocheck
'use client'

import React from 'react'

/**
 * Instructions for Block Template Builder (Sidebar)
 */
export const BlockTemplateBuilderInstructions: React.FC = () => {
    return (
        <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '6px',
            color: 'white',
            fontSize: '0.875rem'
        }}>
            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 'bold' }}>
                📚 How to Use
            </h3>

            <ol style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.6' }}>
                <li>Give your template a name</li>
                <li>Add ONE block below</li>
                <li>Edit it visually</li>
                <li>Click "Export to Block Library"</li>
                <li>Done! Template saved for reuse</li>
            </ol>

            <div style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255,255,255,0.3)',
                fontSize: '0.8rem'
            }}>
                <strong>💡 Tip:</strong> This is a workspace. After exporting, you can delete this entry or reuse it for another template.
            </div>
        </div>
    )
}

export default BlockTemplateBuilderInstructions
