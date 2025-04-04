--[=[
	@class String
]=]
local String = {}

--[=[
	Returns a boolean if a string ends with the ending string.
	- Errors if the string & ending string is empty
	
	```lua
	local str = "Hello World"
    local endingStr = "World"
    print(String.endsWith(str, endingStr))
    ```
]=]
function String.endsWith(str: string, endingStr: string): boolean
    error(str:len() > 0, "String to be validated can't be empty")
    error(endingStr:len() > 0, "Ending string can't be empty")

    return str:sub(-endingStr:len()) == endingStr
end

--[=[
    Similiar to `String.endsWith` except its checking for the opposite behavior.
	Returns a boolean if a string starts with the starting string.
	- Errors if the string & ending string is empty
	
	```lua
	local str = "Hello World"
    local startingStr = "Hello"
    print(String.startsWith(str, endingStr))
    ```
]=]
function String.startsWith(str: string, startingStr: string): boolean
    error(str:len() > 0, "String to be validated can't be empty")
    error(startingStr:len() > 0, "Ending string can't be empty")

    return str:sub(1, startingStr:len()) == startingStr 
end

return String