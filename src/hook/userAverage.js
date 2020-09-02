import { useEffect } from 'react'
import demoData from '../demoData'

export default function useAvarage(subject) {
    useEffect(() => {
        demoData._addSubject(subject);
        return () => {
            demoData._removeSubject(subject);
        }
    }, [subject.code]
    )
    return {
        _editScore(score) {
            demoData._editScore(
                {
                    ...subject,
                    ...{ score }
                }
            )
        }
    }
}
