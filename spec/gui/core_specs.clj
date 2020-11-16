(ns gui.core-specs
  (:require [gui.gui-core :as gcore]
            [gui.mouse-location :as mouse]
            [speclj.core :refer :all]
            [ttt.core :as tcore]
            [spec-helper :as helper]
            [gui.core :as gui]
            [ttt.game-master :as gm]
            [gui.button :as button]))

(def test-game helper/test-game)
(def mock-move helper/mock-move)

(describe "GUI State Tests: "
  (with-stubs)
  (context "game-play"
    (it "game over"
      (reset! mock-move 2)
      (let [playing-state (assoc test-game :console :mock :status :playing :board ["X" "X" 2 3 4 5 6 7 8])
            result (gm/update-state playing-state)]
        (should= ["X" "X" "X" 3 4 5 6 7 8] (:board result))
        (should (gm/game-over? result))
        (should (:game-over? result))
        (should= 1 (:winner result))
        (should= :game-over (:status result)))))

  (context "play-again-pause"
    (it "starts with game-over 1"
      (reset! mock-move 2)
      (let [over-game (assoc test-game :console :mock :status :playing :board ["X" "X" 2 3 4 5 6 7 8])
            result (gm/update-state over-game)]
        (should= 1 (:play-again-pause result))
        (should= :game-over (:status result))))

    (it "ends at 100"
      (let [over-game (assoc test-game :console :mock :status :game-over :game-over? true :play-again-pause 100)
            result (gm/update-state over-game)]
        (should= 100 (:play-again-pause result))
        (should= :play-again (:status result)))))
  )

(describe "GUI Button"
  (context "messages:"
    (it "x turn"
      (let [game {:status :playing :current-player :player1}]
        (should= "X's Turn" (get button/messages (button/get-message-key game)))))

    (it "x wins"
      (let [game {:status :game-over :winner 1}]
        (should= "Game Over: X Won" (get button/messages (button/get-message-key game)))))

    (it "nil"
      (let [game {:status :no-status}]
        (should= "" (get button/messages (button/get-message-key game)))))

    (it "user set up"
      (let [game {:status :user-setup}]
        (should= "Who's Playing?" (get button/messages (button/get-message-key game)))))))