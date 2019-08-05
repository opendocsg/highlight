import _ from 'lodash'
import Annotation from './Annotation'

const COLOR = [
    '#FF0000',
    '#4169E1',
    '#2E8B57'
]

/**
 * Label is object. Holds 1 color and many annotations
 * One annotation can have only have one label (as indicated by type)
 * 
 */
class Label {
    numLabels = 0
    // Add to label with existing type. If not exist, create label.
    addToArray(labels, annotation) {
        if (!this.validateArray(labels) || !Annotation.validate(annotation)) {
            throw new Error('Label validation failed.')
        }
        for (let label of labels) {
            if (label.type === annotation.type) {
                label.annotations.push(annotation)
                return
            }
        }
        let newLabel = this.create(annotation)
        labels.push(newLabel)
    }

    create(annotation) {
        this.numLabels++
        return {
            id: this.numLabels,
            color: COLOR[this.numLabels % COLOR.length],
            type: annotation.type,
            annotations: [annotation]
        }
    }

    getAnnotations(labels) {
        let annotations = []
        for (let label in labels) {
            annotations = _.concat(annotations, label.annotations)
        }
        return annotations
    }

    validateArray(labels) {
        return _.isArray(labels) &&
            labels.every(this.validateLabel)
    }

    validateLabel(label) {
        return _.isPlainObject(label) &&
            'id' in label && _.isNumber(label.id) && label.id >= 0 &&
            'color' in label &&
            'type' in label &&
            'annotations' in label && _.isArray(label.annotations)
    }

}

export default new Label()