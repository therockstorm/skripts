import { log } from "@therockstorm/utils"

test("hi", () => {
  log("should not see this")
  expect(true).toBe(true)
})
