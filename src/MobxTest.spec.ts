import { action, autorun, computed, observable } from "mobx";
describe("Mobx", () => {
  let disposer;
  let disposer1;
  let model;
  let callCount;
  let callCount1;
  beforeEach(() => {
    callCount = 0;
    callCount1 = 0;
    model = observable({
      count: 5,
      person: {
        name: "Blabla",
        surname: "Klaus"
      }
    });
    disposer = autorun(() => {
      console.log("Count: " + model.count);
      callCount++;
    });
    disposer1 = autorun(() => {
      console.log(
        "Full Name: " + model.person.surname + " " + model.person.name
      );
      callCount1++;
    });
  });

  afterEach(() => {
    disposer();
    disposer1();
  });

  it("reacts to changes", () => {
    model.count = 7;
    model.count = 11;
    expect(callCount).toBe(3);
  });
  it("does not react to untracked changes", () => {
    model.person.name = "MÃ¼ller";
    expect(callCount).toBe(1);
  });
  it("reacts to deep changes", () => {
    const myaction = action(() => {
      model.person.name = "MÃ¼ller";
      model.person.surname = "Hans";
    });
    myaction();
    expect(callCount1).toBe(2);
  });

  it("reacts to computed values", () => {
    const myaction = action(() => {
      model.person.name = "";
      model.person.surname = "Hans MÃ¼ller";
    });

    let computedCount = 0;
    const mycomputed = computed(() => {
      computedCount++;
      return model.person.surname + " " + model.person.name;
    });
    const disposer2 = autorun(() => {
      console.log("Computed Full Name: " + mycomputed);
    });
    model.person.name = "MÃ¼ller ";
    model.person.surname = "Hans";
    // does not react if new computed value equals old one
    myaction();
    expect(computedCount).toBe(4);
  });
});
