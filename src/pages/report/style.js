import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'NanumGothic', src: 'fonts/NanumGothic.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
  	padding: 40,
    marginTop: 20,
    paddingBottom: 80,
  },
  section: {
  	fontFamily: 'NanumGothic',
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
  	fontFamily: 'NanumGothic',
  	textAlign: 'left',
  	color: 'black',
  },
  subTitle: {
  	fontFamily: 'NanumGothic',
  	textAlign: 'left',
  	color: 'black',
  	marginTop: 8,
  	marginBottom: 8,
  	fontSize: 10,
  },
  divider: {
  	width: '100%',
  	height: '4px',
    backgroundColor: '#268477',
  	borderStyle: 'solid',
  	borderWidth: 2,
  	borderColor: '#268477'
  },
  headerDivider: {
  	width: '100%',
  	height: '1px',
    backgroundColor: '#268477',
  	borderStyle: 'solid',
  	borderWidth: 1,
  	borderColor: '#268477'
  },
  bottomDivider: {
  	position: 'absolute',
  	margin: 40,
  	bottom: 20,
  	width: '100%',
  	height: '4px',
  	borderStyle: 'solid',
  	borderWidth: 2,
  	borderColor: '#268477'  	
  },
  logo: {
  	fontFamily: 'NanumGothic',  	
  	position: 'absolute',
  	right: 40,
  	top: 40,
  },
  saleslogPieChart: {
    width: "50%",
    margin: "auto",
  },
  mainTitle: {
  	fontFamily: 'NanumGothic',  	
  	color: 'black',
  	fontWeight: 'bold',
  	marginTop: 30,
  },
  headerTable: {
  	display: 'table',
  	flexDirection: 'row',
  	marginTop: 20,
  	marginBottom: 20,
  },
  headerCol: {
    width: '33.3%',
  	fontFamily: 'NanumGothic',  	
  	fontSize: 10,
  },
  headerColStat: {
    width: '25%',
  },
  summaryTable: {
    backgroundColor: '#efefef',
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  summaryCol: {
    fontFamily: 'NanumGothic',    
    width: "25%",
    textAlign: 'center',
    fontSize: 10,
  },
  summaryColStat: {
    width: "50%",
  },
  summaryColTitle: {
    color: '#268477',
    fontSize: 14,
  },
  summaryColCount: {
    marginTop: 10,
  },
  header: {
  	fontFamily: 'NanumGothic',
  	color: '#268477',
  	marginTop: 20,
  	marginBottom: 20,
  },
  content: {
  	fontFamily: 'NanumGothic',
  	color: 'black',
  	marginTop: 20,
  	fontSize: 10,
  	lineHeight: 2,
  },
  card: {
  	display: 'table',
  	fontFamily: 'NanumGothic',
  	backgroundColor: '#efefef',
  	borderTopLeftRadius: 4,
  	borderTopRightRadius: 4,
  	borderBottomRightRadius: 4,
  	borderBottomLeftRadius: 4,
  	marginTop: 20,
    },
  cardTitle: {
  	fontFamily: 'NanumGothic',  	
	marginLeft: 20,
	marginTop: 20,
	marginBottom: 20,
  	fontSize: 10,
  },
  strategyCard: {
  	position: 'absolute',
  	backgroundColor: '#65d1bd',
  	borderTopLeftRadius: 4,
	borderBottomLeftRadius: 4,
  	height: '100%',
  	width: 10,
  },
  operationCard: {
  	position: 'absolute',
  	backgroundColor: '#9285d3',
  	borderTopLeftRadius: 4,
	borderBottomLeftRadius: 4,
  	height: '100%',
  	width: 10,
  },
  productCard: {
  	position: 'absolute',
  	backgroundColor: '#ff4379',
  	borderTopLeftRadius: 4,
	borderBottomLeftRadius: 4,
  	height: '100%',
  	width: 10,
  },
  personalCard: {
  	position: 'absolute',
  	backgroundColor: '#ffcd50',
  	borderTopLeftRadius: 4,
	borderBottomLeftRadius: 4,
  	height: '100%',
  	width: 10,
  },
  sentence: {
  	fontFamily: 'NanumGothic',
  	fontSize: 10,  	
  	marginLeft: 20,
  	marginTop: 10,
  	marginBottom: 20,
  },
  table: { 
    display: "table", 
    width: "auto", 
    marginTop: 20,
    borderStyle: "solid", 
    borderLeftWidth: 0,
    borderTopWidth: 0, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  },
  tableColHeader: {
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#65d1bd'
  },
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0.5, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColAuthorHeader: {
    width: "12.5%",
  },
  tableColAuthor: {
    borderLeftWidth: 0.5,
  },
  tableColAccount: {
    width: "12.5%"
  },
  tableColDate: {
    width: "12.5%"
  },
  tableColContent: {
    width: "50%",
  },
  tableColNeeds: {
    width: "12.5%",
  },
  tableColVisitCount: {
    width: "18.75%"
  },
  tableColVisitCountAccount: {
    width: "37.5%"
  },
  tableCellHeader: { 
    fontFamily: 'NanumGothic',
    margin: 5, 
    marginTop: 5, 
    fontSize: 10,
    color: '#ffffff',
  },
  tableCell: { 
    fontFamily: 'NanumGothic',
    margin: 5, 
    marginTop: 5, 
    fontSize: 10 
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  alarm: {
    position: 'absolute',
    fontSize: 8,
    bottom: 50,
    left: 30,
    color: 'grey',    
  },
  saleslog: {
    position: 'absolute',
    fontSize: 10,
    bottom: 50,
    right: 30,
    color: 'grey',    
  }
});

export default styles;