const DataSource = {
  _Average: 0,
  _TotalSubject: [],
  _setAerage() {
    let _TotalScore = 0;
    this._TotalSubject.forEach(e => {
      _TotalScore += e.score;
    });
    this._Average = (_TotalScore / this._TotalSubject.length).toFixed(2);
    console.log(_TotalScore)
    console.log(this._TotalSubject.length)
    this.averageChangeCb && this.averageChangeCb(this._Average);
  },
  _addSubject(subject) {
    this._TotalSubject.push(subject);
    this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
  },
  _removeSubject(subject) {
    this._TotalSubject = this._TotalSubject.filter(e => {
      return e.code !== subject.code;
    });
    this._setAerage();
    this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
  },
  _editScore(subject) {
    this._TotalSubject = this._TotalSubject.map(e => {
      if (e.code === subject.code) {
        console.log(subject)
        return subject;
      }
      return { ...e };
    });
    this._setAerage();
    this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
  },
  averageChangeCb: null,
  subjectChangeCb: null
};

export default DataSource;
