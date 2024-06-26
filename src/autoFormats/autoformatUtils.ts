import { AutoformatBlockRule } from '@udecode/plate-autoformat'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from '@udecode/plate-code-block'
import {
  getParentNode,
  isElement,
  isType,
  TEditor,
} from '@udecode/plate-common'
import { toggleList, unwrapList } from '@udecode/plate-list'

export const preFormat: AutoformatBlockRule['preFormat'] = (editor:any) => unwrapList(editor)

export const format = (editor: any, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection)
    if (!parentEntry) return
    const [node] = parentEntry
    if (isElement(node) && !isType(editor, node, ELEMENT_CODE_BLOCK) && !isType(editor, node, ELEMENT_CODE_LINE)) {
      customFormatting()
    }
  }
}

export const formatList = (editor: any, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  )
}
