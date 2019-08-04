import _ from 'lodash'
import { ExportToCsv } from 'export-to-csv'

class Annotation {
    create(line, beginOffset, endOffset, type) {
        if (!this.validate({line, beginOffset, endOffset, type})) {
            throw new Error('Annotation validation failed.')
        }
        return {
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
            aObject.line >= 0 && aObject.beginOffset >= 0 && aObject.endOffset >= 0
    }

    exportArrayOfAnnotations(title, annotations) {
        if (!_.isString(title) || !_.isArray(annotations)) {
            throw new Error('Annotation export failed.')
        }
        // Refer to https://docs.aws.amazon.com/comprehend/latest/dg/cer-annotation.html
        // for export format
        annotations = annotations.map((annotation) => {
            return {
                ...annotation,
                title: title
            }
        })

        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'annotations',
            useTextFile: false,
            useBom: true,
            //useKeysAsHeaders: true,
            headers: ['File', 'Line', 'Begin Offset', 'End Offset', 'Type'] // <- Won't work with useKeysAsHeaders present!
          };
        
        const csvExporter = new ExportToCsv(options)
        
        return csvExporter.generateCsv(annotations)
    }
}

export default new Annotation()