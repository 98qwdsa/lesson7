const DataSource = {
    _Average: 0,
    _TotalSuject: [],
    _setAverage() {
        let _TotalSuject = 0;
        this._TotalSuject.forEach(e =>{
            _TotalSuject += e.score;
        });
        this._Average = (_TotalSuject / this._TotalSuject.length).toFixed(2);
        this.averageChangeCb && this.averageChangeCb(this._Average);
    },

    _addSubject(subject) {
        this._TotalSuject.push(subject);
        this.subjectChangeCb && this.subjectChangeCb(this._TotalSuject);
    },
    _removeSubject(subject) {
        this._TotalSuject = this._TotalSuject.filter(e => {
            return e.code !== subject.code;
        });
        this._setAverage();
        this.subjectChangeCb && this.subjectChangeCb(this._TotalSuject);
    },
    _editScore(subject) {
        this._TotalSuject = this._TotalSuject.map(e => {
            if (e.code === subject.code){
                return subject;
            }
            return { ...e };
        });
        this._setAverage();
        this.subjectChangeCb && this.subjectChangeCb(this._TotalSuject);
    },
    averageChangeCb: null,
    subjectChangeCb: null
};

export default DataSource;