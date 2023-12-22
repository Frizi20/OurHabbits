
type Props = {
    children:React.ReactNode
}

function ChatLayout({children}:Props) {
  return (
    <div className="w-[300px]  bg-[#fbfdff] border-r border-gray-100 flex flex-col overflow-hidden flex-1">
        {children}
    </div>
  )
}

export default ChatLayout