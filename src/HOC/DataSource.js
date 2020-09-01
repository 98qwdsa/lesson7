const DataSource = {
    addChangeListener() {
        console.log("addChangeListener")
    },
    removeChangeListener() {
        console.log("removeChangeListener")
    },
    getMathScore(getMathScore) {
        return getMathScore
    },
    getBlogPost() {
        return [{
            name: 'hello wrold',
            time: "10点50分"
        }]
    }
}
export default DataSource;

