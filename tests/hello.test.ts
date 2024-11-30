import { assertEquals } from 'jsr:@std/assert';

Deno.test("assert works correctly", () => {
  assertEquals(1, 1);
});