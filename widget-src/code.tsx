const { widget } = figma;
const {
  Frame,
  Rectangle,
  SVG,
  Text,
  AutoLayout,
  Input,

  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
} = widget;

function Widget() {
  const [title, setTitle] = useSyncedState("title", "Task List");
  const [count, setCount] = useSyncedState("count", 0);
  const tasks = useSyncedMap("tasks");

  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Add new task",
        propertyName: "add",
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === "add") {
        addEntry();
      }
    }
  );

  const addEntry = () => {
    tasks.set(String(count), {
      id: String(count),
      content: "",
      value: false,
    });

    setCount(count + 1);
  };

  const completedTasks = tasks
    .values()
    .filter((a: any) => a?.value === true).length;
  const totalTasks = tasks.size;
  const taskPercent =
    completedTasks / totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <AutoLayout
      name={title + " Task List"}
      width={300}
      spacing={20}
      padding={20}
      cornerRadius={4}
      direction="vertical"
      fill="#FFF"
      // * hug value? personally think it looks good
      height="hug-contents"
      // minHeight={500}
    >
      {/* Widget Heading */}
      <Input
        value={title}
        placeholder="Add task details..."
        fontFamily="Montserrat"
        fontSize={24}
        fontWeight={700}
        width="fill-parent"
        fill="#000"
        onTextEditEnd={(event) => {
          setTitle(event.characters);
        }}
      />
      {/* Checklist */}
      <AutoLayout
        name="ChecklistWrapper"
        width="fill-parent"
        height="hug-contents"
        direction="vertical"
        spacing={16}
      >
        {/* Checklist Heading */}
        <AutoLayout
          name="idc"
          direction="horizontal"
          width="fill-parent"
          verticalAlignItems="center"
          spacing="auto"
        >
          <Text
            name="ChecklistHeading"
            fill="#000"
            lineHeight={24}
            fontFamily="Lato"
          >
            Checklist Items
          </Text>
          <AutoLayout
            hoverStyle={{
              fill: "#eff5fc",
            }}
            cornerRadius={4}
            onClick={() => {
              addEntry();
            }}
            verticalAlignItems="center"
            horizontalAlignItems="center"
            padding={2}
          >
            <SVG
              height={16}
              width={16}
              src="<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M0.857143 6C0.857143 3.15968 3.15968 0.857143 6 0.857143C8.84032 0.857143 11.1429 3.15968 11.1429 6C11.1429 8.84032 8.84032 11.1429 6 11.1429C3.15968 11.1429 0.857143 8.84032 0.857143 6ZM6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6.64286 3.42857C6.64286 3.07353 6.35504 2.78571 6 2.78571C5.64496 2.78571 5.35714 3.07353 5.35714 3.42857V5.35714H3.42857C3.07353 5.35714 2.78571 5.64496 2.78571 6C2.78571 6.35504 3.07353 6.64286 3.42857 6.64286H5.35714V8.57143C5.35714 8.92647 5.64496 9.21429 6 9.21429C6.35504 9.21429 6.64286 8.92647 6.64286 8.57143V6.64286H8.57143C8.92647 6.64286 9.21429 6.35504 9.21429 6C9.21429 5.64496 8.92647 5.35714 8.57143 5.35714H6.64286V3.42857Z' fill='#1471DA'/>
</svg>
"
            />
          </AutoLayout>
        </AutoLayout>
        <AutoLayout
          name="ChecklistWrapper"
          width="fill-parent"
          height="hug-contents"
          direction="vertical"
          spacing={8}
        >
          {/* Checklist Items */}
          {tasks.values().length >= 0 &&
            tasks.values().map((entry: any) => {
              return (
                // Checklist Item
                <AutoLayout
                  name="ChecklistItem"
                  strokeWidth={0}
                  width="fill-parent"
                  spacing={8}
                >
                  <AutoLayout
                    name="Checkbox"
                    spacing={10}
                    width={20}
                    onClick={() => {
                      tasks.set(entry.id, {
                        ...entry,
                        value: !entry.value,
                      });
                    }}
                  >
                    <Frame
                      name="CheckboxOutline"
                      fill="#FFF"
                      stroke={entry.value ? "#777777" : "#303030"}
                      strokeWidth={2}
                      width={20}
                      height={20}
                    >
                      {entry?.value && (
                        <SVG
                          name="CheckMark"
                          x={5}
                          y={{
                            type: "center",
                            offset: 0.5,
                          }}
                          height={9}
                          width={11}
                          src={`<svg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M3.75581 9.16612L0.150644 5.18029C-0.0502148 4.96099 -0.0502148 4.60405 0.150644 4.38243L0.878887 3.58573C1.07975 3.36643 1.40627 3.36643 1.60713 3.58573L4.12044 6.37592L9.72287 0.164472C9.92373 -0.0548241 10.2503 -0.0548241 10.4511 0.164472L11.1794 0.962337C11.3802 1.18163 11.3802 1.53974 11.1794 1.75787L4.48405 9.16612C4.28319 9.38541 3.95667 9.38541 3.75581 9.16612' fill='${
                            entry.value ? "#777777" : "#303030"
                          }'/>
</svg>
`}
                        />
                      )}
                    </Frame>
                  </AutoLayout>
                  <Input
                    name="Label Text"
                    width="fill-parent"
                    x={30}
                    paragraphSpacing={15}
                    lineHeight="150%"
                    fontFamily="Lato"
                    fontSize={11}
                    letterSpacing={0.7}
                    fontWeight={500}
                    //
                    onTextEditEnd={(event) => {
                      tasks.set(entry.id, {
                        ...entry,
                        content: event.characters,
                      });
                    }}
                    value={entry.content}
                    placeholder="Add description..."
                    textDecoration={entry.value ? "strikethrough" : "none"}
                    fill={entry.value ? "#777777" : "#000000"}
                    hoverStyle={{
                      fill: "#0000FF",
                    }}
                  />
                  <AutoLayout
                    hoverStyle={{
                      fill: "#ffcbcb",
                    }}
                    cornerRadius={4}
                    onClick={() => {
                      tasks.delete(entry.id);
                    }}
                  >
                    <SVG
                      src={`<svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5857 16L8.29285 22.2928L9.70706 23.7071L16 17.4142L22.2928 23.7071L23.7071 22.2928L17.4142 16L23.7071 9.70706L22.2928 8.29285L16 14.5857L9.70706 8.29285L8.29285 9.70706L14.5857 16Z" fill="black"/>
                          </svg>`}
                    />
                  </AutoLayout>
                </AutoLayout>
              );
            })}
          {tasks.values().length === 0 && (
            // Fallback text ?
            <Text
              name="FallbackText"
              fontSize={11}
              letterSpacing={0.7}
              fontWeight={500}
              fill="#777"
              fontFamily="Lato"
              width="fill-parent"
            >
              no tasks listed...
            </Text>
          )}
        </AutoLayout>
      </AutoLayout>
      {/* PROGRESS BAR */}
      <AutoLayout direction="vertical" spacing={4} width="fill-parent">
        <AutoLayout
          name="ProgressSection"
          direction="horizontal"
          spacing="auto"
          width="fill-parent"
          verticalAlignItems="center"
        >
          <Text
            name="ProgressHeading"
            fill="#000"
            fontFamily="Lato"
            fontSize={13}
          >
            Progress
          </Text>
          <Text
            name="Percentage"
            fill="#414141"
            fontFamily="Lato"
            fontSize={13}
          >
            {taskPercent}%
          </Text>
        </AutoLayout>
        <Frame
          name="ProgressBar"
          strokeWidth={0}
          width="fill-parent"
          height={8}
          cornerRadius={100}
        >
          <Rectangle name="Background" fill="#D9D9D9" width={260} height={8} />
          <Rectangle
            name="Foreground"
            fill="#1471DA"
            x={-1}
            width={(taskPercent / 100) * 260 + 0.01}
            height={8}
          />
        </Frame>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
