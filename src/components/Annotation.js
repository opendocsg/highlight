import _ from 'lodash'
import { ExportToCsv } from 'export-to-csv'

const MAX_TYPE_LEN = 10
/**
 * Represents a single highlight
 * line, begin, end offset type are necessary for AWS comprehend
 * 
 * selRange is a DOM object convinient to keep so that we can modify
 * the selected range on the fly i.e. insert <span>...
 * so that we don't have to insert it ourselves
 */
class Annotation {
    create(line, beginOffset, endOffset, type, selRange) {
        if (!this.validate({line, beginOffset, endOffset, type, selRange})) {
            throw new Error('Annotation validation failed.')
        }
        return {
            selRange: selRange,
            line: line,
            beginOffset: beginOffset,
            endOffset: endOffset,
            type: type
        }
    }

    validate(aObject) {
        return _.isPlainObject(aObject) &&
            'line' in aObject && _.isInteger(aObject.line) &&
            'beginOffset' in aObject && _.isInteger(aObject.beginOffset) &&
            'endOffset' in aObject && _.isInteger(aObject.endOffset) &&
            'type' in aObject && _.isString(aObject.type) &&
            aObject.type === aObject.type.toUpperCase() && // Type must be UPPERCASE
            aObject.line >= 0 && aObject.beginOffset >= 0 && aObject.endOffset >= 0 &&
            this.validateRange(aObject.selRange)
    }

    validateArray(annotations) {
        return _.isArray(annotations) &&
            annotations.every((annotation) => this.validate(annotation))
    }

    validateRange(selRange) {
        // Refers to a Range object as defined by:
        // https://developer.mozilla.org/en-US/docs/Web/API/Range
        return Object.prototype.toString.call(selRange).split(' ')[1].slice(0, -1) === 'Range'
    }

    exportArrayOfAnnotations(title, annotations) {
        if (!_.isString(title) || !_.isArray(annotations)) {
            throw new Error('Annotation export failed.')
        }
        if (_.isEmpty(annotations)) return
        // Refer to https://docs.aws.amazon.com/comprehend/latest/dg/cer-annotation.html
        // for export format
        let annoWithTitle = annotations.map((annotation) => {
            return {
                'File': title,
                'Line': annotation.line,
                'Begin Offset': annotation.beginOffset,
                'End Offset': annotation.endOffset,
                'Type': annotation.type
            }
        })

        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: false,
            title: 'annotations',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            //headers: ['File', 'Line', 'Begin Offset', 'End Offset', 'Type'] // <- Won't work with useKeysAsHeaders present!
          };
        
        const csvExporter = new ExportToCsv(options)
        
        csvExporter.generateCsv(annoWithTitle)
    }
}

export default new Annotation()