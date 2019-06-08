(func $factorial
  (param $n i32)
  (result i32)
  (local $result i32)
  (set_local $result
    (i32.const 1)
  )
  (block
    (loop
      (if
        (i32.eqz
          (i32.gt_s
            (get_local $n)
            (i32.const 1)
          )
        )
        (then
          (br 2)
        )
      )
      (set_local $result
        (i32.mul
          (get_local $result)
          (get_local $n)
        )
      )
      (set_local $n
        (i32.sub
          (get_local $n)
          (i32.const 1)
        )
      )
      (br 0)
    )
  )
  (get_local $result)
)
(export "factorial"
  (func $factorial)
)
