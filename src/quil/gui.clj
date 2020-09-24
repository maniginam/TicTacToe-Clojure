(ns quil.gui
  (:require [quil.core :as q]
            [quil.middleware :as m]
            [quil.dimensions :as dim]
            [quil.board :refer :all]
            [quil.button :refer :all]
            [quil.gui-game :refer :all]
            [ttt.core :refer :all]
            [quil.gui-messages :refer :all]
            [ttt.default-game :refer :all]
            [quil.mouse-clicks :refer :all]
            [quil.human-prompts :refer :all]
            [quil.boxes :refer :all]
            [quil.game-pieces :as piece]))

(defn setup-gui []
  (q/frame-rate 50)
  (q/set-state! :status :waiting
                :message-key :waiting
                :console :gui
                :users nil
                :board-size 3
                :key-stroke nil
                :enter-key? false
                :current-player :player1
                :player1 {:player-num 1 :piece "X"}
                :player2 {:player-num 2 :piece "O"}
                :board [0 1 2 3 4 5 6 7 8]
                :ai-turn false
                :boxes nil
                :turn nil
                :played-boxes []
                :game-over false
                :rounds 0
                :play-again-pause 0
                :winner nil))

(defn get-message-key [state]
  (cond (= (:status state) :playing) (if (= :player1 (:current-player state)) :player1 :player2)
        (= (:status state) :game-over) (cond (= (:winner state) 0) :catsgame (= (:winner state) 1) :x-won :else :o-won)
        :else (:status state)))

(defn update-state [state]
  (let [ai-turn? (= :computer (:type ((:current-player state) state)))]
  {:game-over        (game-over? state)
   :winner           (if (game-over? state) (:winner (get-winner state)))
   :player1          (:player1 state)
   :player2          (:player2 state)
   :console          (:console state)
   :users            (:users state)
   :board-size       3
   :box-count        (int (Math/pow (:board-size state) 2))
   :key-stroke       (:key-stroke state)
   :enter-key        (:enter-key state)
   :board            (if ai-turn? (make-move state (play-box state)) (:board state))
   :box-played       (:box-played state)
   :played-boxes     (remove nil? (map #(if (not (int? %1)) %2) (:board state) (vec (range 0 (count (:board state))))))
   :turns-played     (count (:played-boxes state))
   :current-player   (if ai-turn? (next-player state) (:current-player state))
   :current-type     (:type ((:current-player state) state))
   :current-plyr-num (:player-num ((:current-player state) state))
   :rounds           (inc (:rounds state))
   :play-again-pause (if (:game-over state) (if (< (:play-again-pause state) 100) (inc (:play-again-pause state)) 100) 0)
   :status           (if (game-over? state) (if (= 100 (:play-again-pause state)) :play-again :game-over) (:status state))
   :message-key      (get-message-key state)}))

(defn draw-state [state]
  (draw-console)
  (draw-gui-board (:board-size state))
  (draw-game-button state 120 715)

  (if (or (= (:status state) :user-setup) (= (:status state) :player-setup) (= (:status state) :board-setup))
    (draw-user-prompt state))

  ;(if (= (:status state) :game-over) (draw-user-prompt state))

  (doseq [box (:played-boxes state)]
    (draw-box box state))

  (if (= (:status state) :playing) (draw-piece state (q/mouse-x) (q/mouse-y)))

  )


(defn -main []
  (q/defsketch gui
             :title "Tic Tac Toe"
             :resizable true
             :size [700 800]
             :setup setup-gui
             :update update-state
             :draw draw-state
             :mouse-clicked mouse-clicked
             :key-typed key-typed
             :features [:keep-on-top]
             :middleware [m/fun-mode])
)



