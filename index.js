
const list = ["Hi", "GoodBye", "Ajab", "God dammit!"];

const root = ReactDOM.createRoot(document.getElementById('root_1'));
root.render(
  <React.StrictMode>
    <app.Red_box quote="Yeah yeah!!" />
    <app.Blue_box quote="Yeeeah yeeeaaah!!!!!" />
    <app.Orange_clock_box description="Science BETCH" />
    <app.Purple_box_with_form />
    <app.Warning_box warn={true} />
    <app.Todo_list color="yellow" items={list} />
    <app.Wierd_form />
    <app.Fancy_border>
      <h3>Yo what up!!</h3>
    </app.Fancy_border>
    <app.ProductTableContainer />
    <app.QuoteMachineLink />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
