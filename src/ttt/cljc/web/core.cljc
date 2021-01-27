(ns ttt.cljc.web.core
	(:require [ttt.cljc.master.core :as tcore]
						[ttt.cljs.web.setup-multis :as setup]
						[ttt.cljc.master.board :as board]))

(def game-atom (atom tcore/game-model))

(defmethod tcore/set-parameters :waiting [game]
	(let [updated-game (assoc game :status :user-setup)]
	(swap! game-atom merge updated-game)
	updated-game))

(defmethod setup/set-players 0 [game]
	(assoc game :player1 {:player-num 1 :piece "X" :type :computer} :player2 {:player-num 2 :piece "O" :type :computer}))

(defmethod setup/set-users 0 [game]
	(assoc (setup/set-players (assoc game :entry 0)) :status :level-setup :users 0))

(defmethod setup/set-users 1 [game]
	(assoc game :status :player-setup :users 1))

(defmethod setup/set-players 2 [game]
	(assoc game :player1 {:player-num 1 :piece "X" :type :human} :player2 {:player-num 2 :piece "O" :type :human}))

(defmethod setup/set-users 2 [game]
	(assoc (setup/set-players (assoc game :entry 2)) :status :board-setup :users 2))

(defmethod tcore/set-parameters :user-setup [game]
	(setup/set-users game))

(defmethod setup/set-players "X" [game]
	(let [player1 {:player-num 1 :piece "X" :type :human}
				player2 {:player-num 2 :piece "O" :type :computer}]
		(assoc game :player1 player1 :player2 player2)))

(defmethod setup/set-players "O" [game]
	(let [player1 {:player-num 1 :piece "X" :type :computer}
				player2 {:player-num 2 :piece "O" :type :human}]
		(assoc game :player1 player1 :player2 player2)))

(defmethod tcore/set-parameters :player-setup [game]
	(assoc (setup/set-players game) :status :level-setup))

(defmethod tcore/set-parameters :level-setup [game]
	(assoc game :status :board-setup :level (keyword (:entry game))))

(defmethod tcore/set-parameters :board-setup [game]
	(let [board-size (js/parseInt (:entry game))
				board (board/create-board board-size)]
		(println "(assoc game :status :playing :board-size board-size :board board): " (assoc game :status :playing :board-size board-size :board board))
		(assoc game :status :playing :board-size board-size :board board)))

(defmethod tcore/game-setup :web [game]
	(if (or (= (:status game) :ready-to-play) (= (:status game) :playing))
		game
		(tcore/set-parameters game)))

(defmethod tcore/run-game :web [game]
	(println "game: " game)
	(tcore/game-setup game))
