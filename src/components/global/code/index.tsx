
type Props = {
    data:any[]
}

const TestData = ({data}: Props) => {
  return (
    <div className="mb-5">
    <code className="">
        <pre className="text-xs h-[300px] overflow-auto">
            {JSON.stringify(data, null, 4)}
        </pre>
    </code>
    </div>
  )
}

export default TestData