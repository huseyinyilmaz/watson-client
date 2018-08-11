; -*- mode: Lisp -*-
(
 (nil .
      (
       (flycheck-stylelintrc . "./.stylelintrc.json")
       (eval .(setq flycheck-scss-stylelint-executable (concat projectile-project-root "/node_modules/.bin/stylelint")))
       (eval .(setq flycheck-css-stylelint-executable (concat projectile-project-root "/node_modules/.bin/stylelint")))
       ))
 )
